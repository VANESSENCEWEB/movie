"""
Exemplo de análise com pandas — Recife Flats Temporada.
Uso: python data/finance/analyze_example.py
"""

from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).parent


def load_data():
    tx = pd.read_csv(
        DATA_DIR / "transactions.csv",
        parse_dates=["event_date", "check_in", "check_out"],
    )
    kpis = pd.read_csv(DATA_DIR / "monthly_kpis.csv")
    apts = pd.read_csv(DATA_DIR / "apartments.csv")
    return tx, kpis, apts


def signed_amount(df: pd.DataFrame) -> pd.Series:
    return df["amount_brl"].where(df["flow"] == "inflow", -df["amount_brl"])


def monthly_pl(tx: pd.DataFrame, year_month: str, apartment_id: str | None = None) -> pd.DataFrame:
    d = tx[tx["year_month"] == year_month].copy()
    if apartment_id:
        d = d[d["apartment_id"] == apartment_id]
    d["signed"] = signed_amount(d)
    summary = (
        d.groupby(["apartment_id", "transaction_type"], as_index=False)["signed"]
        .sum()
        .pivot(index="apartment_id", columns="transaction_type", values="signed")
        .fillna(0)
    )
    summary["net_brl"] = summary.sum(axis=1)
    return summary.reset_index()


if __name__ == "__main__":
    tx, kpis, apts = load_data()

    print("=== P&L calculado — Jun/2026 ===")
    print(monthly_pl(tx, "2026-06"))
    print()

    print("=== KPIs do relatório — Apt 105 ===")
    print(kpis[(kpis["year_month"] == "2026-06") & (kpis["apartment_id"] == "apt_105")])
