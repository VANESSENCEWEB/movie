# Planilha mestre — Recife Flats Temporada

Templates CSV para importar dados dos relatórios mensais e analisar em Python (pandas).

## Arquivos

| Arquivo | Função |
|---------|--------|
| `apartments.csv` | Cadastro dos 4 apartamentos |
| `transactions.csv` | **Tabela principal** — cada receita e despesa em uma linha |
| `shared_expense_allocations.csv` | Como despesas compartilhadas são divididas |
| `monthly_kpis.csv` | Resumo mensal (ocupação, ADR, resultado) |

## Como preencher a cada mês

1. Copie as **receitas** do relatório para `transactions.csv` (`transaction_type = revenue`).
2. Copie **despesas fixas** e **extras** (`fixed_expense` / `extra_expense`).
3. Para **despesas compartilhadas**: registre a divisão em `shared_expense_allocations.csv` e crie uma linha `shared_expense` por apartamento em `transactions.csv`.
4. Opcional: copie os totais do relatório para `monthly_kpis.csv` (para conferência).

### Convenções

- `year_month`: `YYYY-MM` (ex.: `2026-06`)
- Datas: `YYYY-MM-DD`
- Valores: sempre positivos; use `flow` = `inflow` (entrada) ou `outflow` (saída)
- `transaction_id`: único, sugestão `ANO-MES-apt_XXX-tipo-NNN`

## Exemplo rápido em Python

```python
import pandas as pd

tx = pd.read_csv("data/finance/transactions.csv", parse_dates=["event_date", "check_in", "check_out"])
tx["signed"] = tx["amount_brl"].where(tx["flow"] == "inflow", -tx["amount_brl"])

# Um apartamento, um mês
apt105_jun = tx[(tx["year_month"] == "2026-06") & (tx["apartment_id"] == "apt_105")]
print(apt105_jun.groupby("transaction_type")["signed"].sum())

# Todos os apartamentos, um mês
jun = tx[tx["year_month"] == "2026-06"]
pl = jun.groupby("apartment_id")["signed"].sum().reset_index(name="net_brl")
print(pl)
```

## Próximo mês

**Não apague linhas antigas.** Apenas adicione novas linhas com `year_month = 2026-07`, etc.
