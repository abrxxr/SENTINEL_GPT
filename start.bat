@echo off
echo ==========================================
echo       STARTING SENTINELGPT PLATFORM
echo ==========================================
echo.

echo [1/2] Starting Backend Server (FastAPI)...
start "SentinelGPT Backend" cmd /k "cd backend && pip install -r requirements.txt && python main.py"

echo [2/2] Starting Frontend Server (React/Vite)...
start "SentinelGPT Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ==========================================
echo All servers are booting up in separate windows!
echo.
echo -> Frontend: http://localhost:5173
echo -> Backend:  http://localhost:8000
echo ==========================================
echo.
echo You can safely close this window.
pause
