# BruinShare

This is the Github repository for the web app BruinShare, created for the class CS35L (Software Construction Lab) by team members Joyce Chen, Subham Kumar, Peony Mong, Roland Yang, and Florence Zhao.

## About the Project

BruinShare is a web app designed to streamline the process of ridesharing for UCLA students.

### Built With

This app was created using the following technologies:
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

Run the following commands in terminal in the directory you wish to clone this repository:

```
git clone https://github.com/lablueprint/friends-of-the-children.git
cd BruinShare
npm install --save
```

## Running the Web App

To start up the client-side view, run the following commands in the project directory:

```
cd frontend
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) to view it in the app in your browser.

To start up the server, run:

```
cd backend
npm start
```

## Firebase

To connect to the Firebase backend, create an env.js file in the root of the backend directory and fill it with the appropriate environment variables. These can be found in the Firebase console for the Bruin-Share Firebase app.

```
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxxx
REACT_APP_FIREBASE_APP_ID=xxxxx
REACT_APP_FIREBASE_MEASUREMENT_ID=xxxxx
```
