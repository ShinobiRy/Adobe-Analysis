@echo off
cd /d "%~dp0"

REM Create virtual environment if it doesn't exist
IF NOT EXIST venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Start browser after a short delay (in a separate thread)
start "" timeout /t 3 & start http://127.0.0.1:5000

REM Run the Flask app
echo Starting Flask app...
python app.py

pause
