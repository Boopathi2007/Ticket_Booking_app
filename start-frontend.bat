@echo off
echo ==============================================
echo   EventEase - Starting Frontend Server (Port 3000)
echo ==============================================
echo Opening http://localhost:3000 in your browser...
start http://localhost:3000
python -m http.server 3000 --directory frontend
pause
