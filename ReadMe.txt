
Phase 1: Appwrite Cloud Setup (The Backend)
Since the database lives in the cloud, this must be configured first so the apps have a place to send data.

Create a Project: Log into the Appwrite Console, click "Create Project," and name it CollegeAttendance.

Create the Database: Go to Databases, click "Create Database," and name it college-db.

Create Collections: Create two collections:

attendance-table: For storing student check-ins.

courses-table: For storing classroom GPS coordinates and course IDs.

Define Attributes: Inside each collection, go to the Attributes tab and add the keys (String, Float, or Boolean) exactly as defined in your code (e.g., student-id, course-id, lat, lon).

Set Permissions: In the Settings tab for both collections, add a role for "Any" and grant Read and Create permissions.

Phase 2: System Environment Setup
The person running the project must have these tools on their computer to compile the code:

Install Node.js: Download and install the LTS version from nodejs.org.

Install Expo Go: The user must download the Expo Go app on their physical Android or iOS device from the App Store/Play Store.

Download the Project: Clone or download your project folder to the computer.

Phase 3: Code Configuration & Launch
This is where the user connects their local code to your specific cloud database.

1. Update the API Keys
The user must open the project in VS Code and update the following files:

Professor Web: Open professor-web/src/lib/appwrite.js and paste the Project ID and Database/Collection IDs from the Appwrite Console.

Student App: Open student-app/lib/appwrite.js and ensure the same IDs are updated there.

2. Launch the Professor Portal
Open a terminal in the professor-web folder.

Run npm install to download the libraries (like React and QR generator).

Run npm start. The dashboard will open at http://localhost:3000.

3. Launch the Student App
Open a second terminal in the student-app folder.

Run npm install to install Expo and Location modules.

Run npx expo start. A large QR code will appear in the terminal.

Scan the terminal QR using the Expo Go app on a phone.

Phase 4: The Live Testing Process
Explain exactly how to perform the demo:

On the Web: Select a course. The QR code will appear and begin its 15-second refresh cycle.

On the Phone: Log in with an SOT email. Tap "Scan QR".

Verification: The phone calculates the distance to the classroom. If the user is within 50m, the app sends a "Success" message.

Result: Watch the Web Portal; the student's email and time will appear in the live feed instantly.



