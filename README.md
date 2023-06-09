[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://nodejs.org/static/images/logo.svg
[Node-url]: https://nodejs.org/en

# BruinShare

This is the Github repository for the web app BruinShare, created for the class CS35L (Software Construction Lab) by team members Joyce Chen, Subham Kumar, Peony Mong, Roland Yang, and Florence Zhao.

## About the Project

BruinShare is a web app designed to streamline the process of ridesharing for UCLA students.
Run the following commands in terminal in the directory you wish to clone this repository:

```
git clone https://github.com/rolandyangg/BruinShare.git
cd BruinShare
npm install --save
```

## Built With

This app was created using the following technologies:
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]

## Running the Web App
To start up the client-side view, run the following commands in the project directory BruinShare:

```
cd frontend
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) to view it in the app in your browser.

To start up the server, run the following commands in the project directory BruinShare:

```
cd backend
npm start
```

## Setting Up Firebase

To connect to the Firebase backend, create an env.js file in the root of the backend directory and fill it with the appropriate environment variables. These can be found in the Firebase console for the BruinShare Firebase app.

```
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxxxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxxx
REACT_APP_FIREBASE_APP_ID=xxxxx
REACT_APP_FIREBASE_MEASUREMENT_ID=xxxxx
```

## Main Features
* Landing Page
<img width="700" alt="image" src="https://github.com/rolandyangg/BruinShare/assets/42717361/bc1815ab-e238-4873-885b-e5febb4c8c18">
* Main Rideshare Postings Bulletin Page
<img width="1440" alt="Screen Shot 2023-06-09 at 11 02 43 AM" src="https://github.com/rolandyangg/BruinShare/assets/64048278/afcee13a-23c3-4bf2-9614-0c6ce247dc33">
* MyRides Page to see groups you joined and created
<img width="1440" alt="Screen Shot 2023-06-09 at 11 03 13 AM" src="https://github.com/rolandyangg/BruinShare/assets/64048278/1704464c-ae54-4f7f-aacc-17b427a91f1e">
* Log In and Sign Up Functionality
<img width="700" alt="image" src="https://github.com/rolandyangg/BruinShare/assets/42717361/b006aa44-1924-433b-9da7-020873181491">
<img width="700" alt="image" src="https://github.com/rolandyangg/BruinShare/assets/42717361/2e45d312-4a4f-4725-a99d-ef4d0262bb1d">
