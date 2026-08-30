@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies first...
  call npm install
  if errorlevel 1 exit /b 1
)
echo Running TypeScript, lint and production build checks...
call npm run check
if errorlevel 1 (
  echo.
  echo CHECK FAILED - read the error above.
  pause
  exit /b 1
)
echo.
echo ALL PROJECT CHECKS PASSED.
pause
