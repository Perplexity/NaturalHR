# About
This project features a working Login, Register, and Home page with user uploads and uses JSON Web Tokens (JWT) for authorization. This project was built in React, using the [create-react-app](https://create-react-app.dev/) boilerplate with the Redux template.

# Setup
Follow these instructions to get a working build:

1. Make sure you have [NodeJS](https://nodejs.org/en/) installed on your system.
2. Copy all contents from `client` place it into a directory. (NOT your root directory, we haven't created a production build yet)
3. Open a terminal client, and go to the directory where you placed the `client` files.
4. Run the command `npm install` to install the node modules needed.
5. Run the command `yarn build` to create a production build of our React project.
6. If that doesn't work, you need to install yarn by running the command `npm install yarn -g` to install yarn globally, and then try again.
7. You will now have a `build` directory. Copy all files from this folder into your website's root directory (e.g. `htdocs`, `wwwroot`, etc)
8. Copy all files from the `server` folder into your website's root directory.
9. Create a database named `naturalhr` in your MySQL database.
10. Run the `naturalhr.sql` script in your `naturalhr` database.
11. Update the login credentials in `server/Library/Database/DB.php`.
12. Navigate to your website, and everything should work smoothly.

# The website only displays a white blank page

This usually happens if you're placing the production files inside a subdirectory. It is recommended to place it in the root directory for easier installation.

Follow these steps if you need it to be in a subdirectory:

**Assuming our subdirectory is called** `naturalhr`:

1. In `client/src/index.js`, replace
```javascript
<ConnectedRouter history={history}>
```
with
```javascript
<ConnectedRouter history={history} basename="/naturalhr">
```

2. In `client/src/store.js`, replace
```javascript
export const history = createBrowserHistory();
```
with
```javascript
export const history = createBrowserHistory({
  basename: "naturalhr"
});
```
3. In `client/src/package.json`, change the `homepage` value to `/naturalhr`.
4. Follow the Setup process from step 4 or 5.
