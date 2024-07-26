#Task Manager Application
Useful to keep track of tasks to do and stages of each task.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Installation (I have given almost all necessary sh to run this project, if any requirnment is there, you can download any libraries needed since all are open source)
### I have also attached all the screenshots for reference 

Prerequesites-Node Js, Express, React Js, Mysql2, Github

How to install(Github)- #converting git repo to local#

                        -git init
                        -git init https://github.com/shashankhumcha/task_manager.git
                        -once done open it in VS code.

How to install Google Login requirements-npm install express passport passport-google-oauth20 cookie-session

                                        Client ID:282601366617-i2jti282ah524gq1pld63lp2dsk39kcc.apps.googleusercontent.com
                                       

How to install(node.js)-npm init -y
           - npm install express
        -node app.js
        -npm install express jsonwebtoken bcryptjs
        -npm install axios


How to install(react.js)-npx create-react-app my-react-app
                       - npm start

Additional packages-npm install react-router-dom

How to install(mysql2)-npm install mysql2
                        -node db.js

For database, Task_Manager file isgiven inside that you can find tables.
To create database- mysql --version;
                -create database task_manager;
                -CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255), -- Password field is optional for Google login
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

                -CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('TODO', 'IN_PROGRESS', 'DONE') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Any config-createdv.env file to store clientId for google login.

once mysql is downloaded, open terminal, and type-mysql -u root -p
Now enter the password-Sshashank@2003
once entered database is live.

### Features
Local login and Signup.

Google login and Signup is supported.

User Password gets stored in database in Hash manner and get converted once retrieved.

Avatar display of current user.

Sarching and Sorting of tasks is supported.

Adding of task along with the status.

Support  change status of the tasks that has been created to -todo, in process, done.

Deletion of task is supported.

Along with details such as date and other info can be seen.

## Future contribution

Can make it much more appealing to look.


## Contributions 

Visual Studio Code: A code editor used for developing the application.<Visit the website>

GitHub: A platform for version control and collaborative development, hosting this project’s repository.<GitHub Website>

Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. <Express Website>

mysql2: A MySQL client for Node.js that allows interaction with MySQL databases. It provides a faster and more efficient interface than the mysql package. <mysql2 Documentation>

Create React App: A tool to set up a new React project with a default configuration, providing a smooth development experience. <Create React App Documentation>


<Shashank S:> Developer and maintained by.

### Contact Info

Name: Shashank S

Mail Id: shashanksbhat03@gmail.com

Linkedin: https://www.linkedin.com/in/shashank-s-a453a521b

Website: www.kickresume.com/cv/mr-shashank/

Github: shashankhumcha
