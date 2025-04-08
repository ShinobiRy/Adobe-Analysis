🧠 Project Description: Adobe App Usage Detector
Adobe App Usage Detector is a lightweight Flask-based web application that analyzes system activity logs, file paths, and metadata to intelligently determine which Adobe application was used to open or edit a file.

🔍 Key Features:
- Activity History Parsing: Scans recent system activities to trace Adobe app interactions.
- File Path Analysis: Detects application signatures and common folder structures used by different Adobe apps (e.g., Photoshop, Illustrator, Premiere Pro, etc.).
- Smart App Detection: Matches usage patterns to known Adobe tools based on how files are accessed and modified.
- Web-based Interface: Clean and responsive interface built using HTML, CSS, and JS, rendered through Flask.

▶️ How to Run the Project (Windows)
This project is a Flask web app that detects which Adobe application was used based on file paths, activity history, and system logs.

🧾 Steps
1. Download the Repository
- Visit the GitHub repository page.
- Click Code → Download ZIP and extract it to your local machine.

Or, if using Git:

git clone https://github.com/your-username/shinobiry-adobe-analysis.git
cd shinobiry-adobe-analysis

2. Locate and Run run_app.bat
- Inside the extracted folder (shinobiry-adobe-analysis), find the file named: run_app.bat
- Double-click it.

This batch file will:
- Automatically set up a virtual environment (venv) if not already created
- Install the required packages listed in requirements.txt
- Run the Flask application using python app.py
- Open your default browser at: http://127.0.0.1:5000

✅ After Running
- Once opened in the browser, you can interact with the app to analyze Adobe usage data through the web interface.

❌ To Stop the App
- Focus the command prompt window that opened
- Press Ctrl + C to safely stop the Flask server

