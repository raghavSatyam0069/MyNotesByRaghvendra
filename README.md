# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting Our Resources in src folder

1-copy the [NotesAppByRaghvendra] and [service] folder to src folder.

2-import [mainCompNotes.jsx] file to [index.js] of your [React App].

3-`npm run build` (Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.)

4-copy [webjwt.js](server file) to your react-app.

5-start the server by typing `node webjwt.js` in the terminal of your React App.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Deployment

react-app can be deployed in firebase by using these steps-
--Creating a firebase project

1. Open this link on your browser. Link -https://firebase.google.com/

2. Sign in with your goggle account.

3. Go to console which is present on right side of screen.

4. Click on Add project

5. Enter the name of your project and click on continue. Note: Please ensure name of project is six random characters like bjtyhi

6. Do not change any settings in Step 2 of creating project and click on continue

7. Select your firebase account and create project .It will take some time to setup.

8. Project dashboard will open

--Hosting React app on Firebase

1. Install command line tolls of firebase(If you already have then no need for this step)
   npm i – g firebase-tools

2. Make a firebase project and deploy your app to the that project

React--https://medium.com/swlh/how-to-deploy-a-react-app-with-firebase-hosting98063c5bf425

### deployment of server on Render.com

1. Create a new directory and open it. For example folder is named demo.
2. Initialize your node project. This will add a package.json file to your directory by `npm init --yes`.
3. Add express via `npm i express –save`.
4. Add a file names app.js. This is the main file with node code. Use the following line for line in the node where port is defined.
   `var port=process.env.PORT || 2410`
5. Update your package.json file to include a start script and change the "main" property to app.js. Change scripts property in your package.json.

6. Initialise a git repo and commit your work.

7. in render
   Create a new Web Service
   Choose / import git repository and press connect

8. When any change to node is made repeat the following steps
   git add .
   git commit -m “Initial Commit”
   git push -u origin main
   Update will be automatically deployed if not click on manually deploy and select deploy latest commit.

9. Updating the URL of the Node server in the Angular / React app
   1.In the Angular / React app, update the server URL to the one obtained from render
   2.Deploy the Angular / React app again•
