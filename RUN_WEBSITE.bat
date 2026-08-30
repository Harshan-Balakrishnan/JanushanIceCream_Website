@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Dependencies are not installed yet. Running setup first...
  call SETUP_AND_RUN.bat
  exit /b %errorlevel%
)
start "" http://localhost:3000
call npm run dev
