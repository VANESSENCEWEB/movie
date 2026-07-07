@echo off
chcp 65001 >nul
cd /d "%~dp0"

(
  echo /* Atualizado automaticamente — fonte: css/base.css + css/components/* */
  type css\base.css
  powershell -Command "(Get-Content css\components\background-grid.css) -replace '../../images/', '../images/' | Write-Output"
  type css\components\header.css
  type css\components\hero.css
  type css\components\footer.css
) > css\site.css

echo CSS atualizado em css\site.css
pause
