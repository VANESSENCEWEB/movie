@echo off
chcp 65001 >nul
title Servidor Local - Template
color 0A

echo.
echo  ============================================
echo   INICIANDO O TEMPLATE LOCALMENTE
echo  ============================================
echo.
echo  NAO abra o index.html com duplo clique!
echo  Use este arquivo para ver as animacoes.
echo.

cd /d "%~dp0"

where python >nul 2>nul
if %errorlevel%==0 goto :python

where node >nul 2>nul
if %errorlevel%==0 goto :node

echo  [ERRO] Instale Python ou Node.js:
echo    Python: https://www.python.org/downloads/
echo    Node:   https://nodejs.org/
echo.
pause
exit /b 1

:python
echo  Usando Python...
echo  Abra no navegador: http://localhost:3000
echo  Pressione Ctrl+C para parar.
echo.
start "" "http://localhost:3000"
python -m http.server 3000
goto :end

:node
echo  Usando Node.js...
echo  Abra no navegador: http://localhost:3000
echo  Pressione Ctrl+C para parar.
echo.
start "" "http://localhost:3000"
npx --yes serve . -p 3000
goto :end

:end
pause
