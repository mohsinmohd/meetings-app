# meetings-app

Setting Up and running app:

1. Install the dependent packages by running "npm install"
2. Install MySql server if you are planning to run it locally
3. Modify mySql credentials in "utils/db-connection.js"
4. Start the app by running "npm start"


TODOS:
1. Hash the password instead of saving it directly.(We could acheive this by having an environmental hash that could be used to encrypt and decrypt password before saving it to db)
2. Save JWT Refresh Tokens in DB instead of temproray storage in server
3. Login and SignUp authorization are pending which need to be dealt with
4. Add test cases for various controller and dao methods