@echo off
setlocal
cd /d "%~dp0"
echo.
echo ==============================================
echo   JANUSHAN ICE CREAM WEBSITE - EASY START
 echo ==============================================
echo.
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed.
  echo Install the current Node.js LTS version from https://nodejs.org/
  echo Then run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing project packages. This can take a few minutes...
  call npm install
  if errorlevel 1 (
    echo.
    echo Installation failed. Check your internet connection, then run this file again.
    pause
    exit /b 1
  )
)
echo.
echo Starting Janushan Ice Cream website...
echo Open http://localhost:3000 in your browser if it does not open automatically.
start "" http://localhost:3000
call npm run dev
