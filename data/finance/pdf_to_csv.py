#!/usr/bin/env python3
"""
Extrai tabelas de relatórios PDF (Recife Flats) para CSV.

Uso:
  pip install -r data/finance/requirements.txt
  python data/finance/pdf_to_csv.py relatorio_apt105_jun2026.pdf
  python data/finance/pdf_to_csv.py relatorios/*.pdf --output-dir data/finance/out

Requisitos:
  - PDF com texto selecionável (não só imagem escaneada)
  - Se for só imagem, use OCR (ver README)
"""

from __future__ import annotations

import argparse
import re
import sys
from datetime import datetime
from pathlib import Path

import pandas as pd
import pdfplumber

# Mapeamento nome do apt no PDF → apartment_id
APT_MAP = {
    "105": "apt_105",
    "804": "apt_804",
    "203": "apt_203",
    "1006": "apt_1006",
    "apt 105": "apt_105",
    "apt 804": "apt_804",
    "apt 203": "apt_203",
    "apt 1006": "apt_1006",
    "apartamento 105": "apt_105",
    "apartamento 804": "apt_804",
    "apartamento 203": "apt_203",
    "golden view": "apt_1006",
}

MONTH_MAP = {
    "janeiro": "01", "fevereiro": "02", "março": "03", "marco": "03",
    "abril": "04", "maio": "05", "junho": "06",
    "julho": "07", "agosto": "08", "setembro": "09",
    "outubro": "10", "novembro": "11", "dezembro": "12",
}


def parse_brl(value: str) -> float:
    if value is None:
        return 0.0
    s = str(value).strip()
    if not s or s in {"—", "-", ""}:
        return 0.0
    s = s.replace("R$", "").replace(".", "").replace(",", ".").strip()
    try:
        return float(s)
    except ValueError:
        return 0.0


def parse_date_br(value: str) -> str:
    """DD/MM/YYYY → YYYY-MM-DD"""
    if not value:
        return ""
    m = re.match(r"(\d{2})/(\d{2})/(\d{4})", str(value).strip())
    if not m:
        return ""
    d, mo, y = m.groups()
    return f"{y}-{mo}-{d}"


def detect_metadata(text: str) -> tuple[str, str, str]:
    """Retorna (year_month, apartment_id, source_label)."""
    year_month = ""
    apartment_id = ""
    lower = text.lower()

    # Mês/ano: "JUNHO / 2026" ou "Junho 2026"
    month_match = re.search(
        r"(janeiro|fevereiro|mar[cç]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s*/?\s*(\d{4})",
        lower,
    )
    if month_match:
        month_name, year = month_match.groups()
        mm = MONTH_MAP.get(month_name.replace("ç", "c"), "01")
        year_month = f"{year}-{mm}"

    for key, apt_id in APT_MAP.items():
        if key in lower:
            apartment_id = apt_id
            break

    apt_num = re.search(r"apartamento\s*(\d+)", lower) or re.search(r"apt\.?\s*(\d+)", lower)
    if apt_num and not apartment_id:
        apartment_id = APT_MAP.get(apt_num.group(1), f"apt_{apt_num.group(1)}")

    source = f"pdf_{year_month}_{apartment_id}" if year_month and apartment_id else Path("import").stem
    return year_month, apartment_id, source


def normalize_header(row: list) -> list[str]:
    return [re.sub(r"\s+", " ", str(c or "").strip().lower()) for c in row]


def classify_table(header: list[str]) -> str | None:
    h = " | ".join(header)
    if "check-in" in h or "hóspede" in h or "hospede" in h:
        return "revenue"
    if "despesas fixas" in h or ("tipo" in h and "vencimento" in h):
        return "fixed_expense"
    if "despesas extras" in h or ("categoria" in h and "descrição" in h):
        return "extra_expense"
    if "compartilh" in h or "valor por apt" in h:
        return "shared_expense"
    return None


def table_to_rows(
    table: list[list],
    table_type: str,
    year_month: str,
    apartment_id: str,
    source: str,
    seq: dict[str, int],
) -> list[dict]:
    if not table or len(table) < 2:
        return []

    header = normalize_header(table[0])
    rows_out: list[dict] = []

    for raw in table[1:]:
        if not any(str(c).strip() for c in raw):
            continue
        row = {header[i]: (raw[i] if i < len(raw) else "") for i in range(len(header))}
        line_text = " ".join(str(v) for v in raw).lower()
        if "total" in line_text and parse_brl(str(raw[-2] if len(raw) > 2 else "")) == 0:
            continue

        seq[table_type] = seq.get(table_type, 0) + 1
        tid = f"{year_month}-{apartment_id}-{table_type[:3]}-{seq[table_type]:03d}"

        if table_type == "revenue":
            amount = parse_brl(row.get("valor total", row.get("valor", "")))
            if amount <= 0:
                continue
            rows_out.append({
                "transaction_id": tid,
                "year_month": year_month,
                "apartment_id": apartment_id,
                "transaction_type": "revenue",
                "category": "reserva",
                "subcategory": "",
                "description": "Reserva",
                "guest_name": row.get("hóspede", row.get("hospede", "")),
                "event_date": parse_date_br(row.get("check-in", "")),
                "check_in": parse_date_br(row.get("check-in", "")),
                "check_out": "",
                "nights": row.get("noites", ""),
                "amount_brl": amount,
                "flow": "inflow",
                "status": str(row.get("status", "pago")).lower(),
                "source": source,
                "notes": "",
            })

        elif table_type in ("fixed_expense", "extra_expense"):
            amount = parse_brl(row.get("valor", ""))
            if amount <= 0:
                continue
            tipo = row.get("tipo", row.get("categoria", "outro"))
            rows_out.append({
                "transaction_id": tid,
                "year_month": year_month,
                "apartment_id": apartment_id,
                "transaction_type": table_type,
                "category": tipo,
                "subcategory": "",
                "description": row.get("descrição", row.get("descricao", "")),
                "guest_name": "",
                "event_date": parse_date_br(row.get("vencimento", row.get("data", ""))),
                "check_in": "",
                "check_out": "",
                "nights": "",
                "amount_brl": amount,
                "flow": "outflow",
                "status": str(row.get("status", "pago")).lower(),
                "source": source,
                "notes": "",
            })

        elif table_type == "shared_expense":
            amount = parse_brl(row.get("valor por apt", row.get("valor por apt.", "")))
            if amount <= 0:
                continue
            rows_out.append({
                "transaction_id": tid,
                "year_month": year_month,
                "apartment_id": apartment_id,
                "transaction_type": "shared_expense",
                "category": "compartilhada",
                "subcategory": "",
                "description": row.get("descrição", row.get("descricao", "")),
                "guest_name": "",
                "event_date": f"{year_month}-01" if year_month else "",
                "check_in": "",
                "check_out": "",
                "nights": "",
                "amount_brl": amount,
                "flow": "outflow",
                "status": str(row.get("status", "pago")).lower(),
                "source": source,
                "notes": row.get("apartamentos", ""),
            })

    return rows_out


def extract_pdf(pdf_path: Path) -> pd.DataFrame:
    all_rows: list[dict] = []
    seq: dict[str, int] = {}

    with pdfplumber.open(pdf_path) as pdf:
        full_text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        year_month, apartment_id, source = detect_metadata(full_text)

        if not year_month:
            print(f"  ⚠ Não detectei mês/ano em {pdf_path.name} — preencha manualmente depois", file=sys.stderr)
        if not apartment_id:
            print(f"  ⚠ Não detectei apartamento em {pdf_path.name}", file=sys.stderr)

        for page in pdf.pages:
            tables = page.extract_tables() or []
            for table in tables:
                if not table:
                    continue
                header = normalize_header(table[0])
                table_type = classify_table(header)
                if not table_type:
                    continue
                all_rows.extend(
                    table_to_rows(table, table_type, year_month, apartment_id, source, seq)
                )

    return pd.DataFrame(all_rows)


def main():
    parser = argparse.ArgumentParser(description="Extrai relatório PDF Recife Flats → CSV")
    parser.add_argument("pdfs", nargs="+", help="Caminho(s) do(s) PDF(s)")
    parser.add_argument(
        "--output-dir",
        default=None,
        help="Pasta de saída (default: mesma pasta do script)",
    )
    parser.add_argument(
        "--append",
        action="store_true",
        help="Acrescenta em transactions.csv em vez de sobrescrever",
    )
    args = parser.parse_args()

    base = Path(__file__).parent
    out_dir = Path(args.output_dir) if args.output_dir else base
    out_dir.mkdir(parents=True, exist_ok=True)

    frames = []
    for pdf_arg in args.pdfs:
        pdf_path = Path(pdf_arg)
        if not pdf_path.exists():
            print(f"Arquivo não encontrado: {pdf_path}", file=sys.stderr)
            sys.exit(1)
        print(f"Processando: {pdf_path.name}")
        df = extract_pdf(pdf_path)
        print(f"  → {len(df)} linhas extraídas")
        frames.append(df)

    if not frames:
        print("Nenhum dado extraído.", file=sys.stderr)
        sys.exit(1)

    result = pd.concat(frames, ignore_index=True)
    out_file = out_dir / "transactions_extracted.csv"

    if args.append and (base / "transactions.csv").exists():
        existing = pd.read_csv(base / "transactions.csv")
        result = pd.concat([existing, result], ignore_index=True).drop_duplicates(subset=["transaction_id"])

    result.to_csv(out_file, index=False)
    print(f"\nSalvo: {out_file} ({len(result)} linhas)")
    print("Revise o CSV antes de mesclar com transactions.csv — extração automática pode errar células.")


if __name__ == "__main__":
    main()
