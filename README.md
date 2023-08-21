# TODO-List

A TODO list using node

REQUIREMENTS TO RUN THE CODE:

Install
.Node.js
.Post Man (the code included a json file that you can import in post man and use the routes for testing)
.Docker instalation

PLEASE ADD .env file with the following configuration

PORT=3000
DB_USER='home'
DB_PASSWORD='MyCommunitiesHome'
DB_HOST='localhost'
DB_NAME='my_list'
DB_PORT='5432'
API_KEY='123'
JWT_SECRET='my_secret'

**\*\*\*\***GENERAL****\*****
For a better development of testing this application, I decided to give it the following structure. This application is based on clean architecture, so the service layer won't be tightly coupled to the others, making it convenient when switching between PostgreSQL and MongoDB as databases. By using Docker, there's no need to install anything locally; you simply need to run the image that comes with the databases and their interfaces to visualize all the data in the browser. Next, I will be explaining more functionalities and how to execute the app

As a good practice, I decided to include schemas for data validation and error handling. Most of the functionalities are implemented for the use of PostgreSQL as the default database. Once you switch to MongoDB, only a few functionalities will be available to respond to questions. The application involves creating users using the methods and creating tasks. Start by creating the users. Users will need to authenticate to create tasks using the /login route. Then, use the authentication token returned from the query as a bearer token to manage access to the task routes

For this project I will use postgresql in a docker container. Said this to test this aplication, is important to have docker install (https://docs.docker.com/desktop/install/windows-install/).

Docker instructions:
.create in the root of the project the folder postgres_data to storage all data related with the database(the postgres image has a volume for persistance )

docker-compose up -d postgres => run postgres in docker
or
docker-compose up

(for all services)

**\*\*\*\***GENERAL****\*****

\***\*\*\*\***OPTIONAL\***\*\*\*\*\***

-------- WATCH DATA BASE IN CONSOLE-----------
docker-compose ps => check docker services running
docker-compose exec postgres bash => connect postgress with terminal
psql -h localhost -d my_list -U home => to my database
\d+ => check database structure
\q => get out of database
exit => get out of container

-------TO WATCH DATABASE IN AN INTERFACE(pgadmin)--------------------
docker-compose up -d pgadmin => run pgadmin in docker
open in a browser: localhost:5050 and intruduce credentias(user: admin@mail.com, password: root)

------INTRUCTIONS TO CONNECT PGADMIN WITH YOUR DATABASE ON DOCKER----
.once inside pgadmin create new server
.Name it as you prefer
For connect it with our database follow:

1. Go to Connection when creating server, port 5432
2. credentials(database: my_list, username: home, pass: MyCommunitiesHome ) Activate save pass
3. To get the IP follow these commands on the terminal:
   docker ps => will give you the container id where the postgres image
   docker inspect (container ID) => will provide IPAddress that you will use for pgadmin

Save and connect

\***\*\*\*\***OPTIONAL\***\*\*\*\*\***

\***_FOLLOWING REQUIREMENTS_**

1- Include CRUD (create/read/update/delete) methods.

Done for postgress database. If you want to move free without auth to create task just go to /routes/task.router.js and commned all lanes that use the middleware passport.auth (passport.authenticate('jwt', { session: false }),) for all the routes. In case of eliminating this funtionality we need to add the following adjustment to create tasks:

.Go to /schemas/task.schemas.js and uncomment line 10 (//userId: userId.required(),)
.go to /routes/task.router.js and comment line 53 ( body['userId'] = req.user.sub;)
.add userId in the body of the request (Add a valid user Id)

2- Include a database to store and remove items from the list.

You can see all the databases usinmg the docker config all the connections are set up by default. Be sure to create and configure the .env file

3- How would the implementation differ if the database was swapped out from a SQL DB to a Non-SQL DB?

The app come by default with SQL database. You can use the routes to test and check de result. In the case of SQL database you will have 2 TABLES, 1 for users and the other for task, and there will be a join to define the association one to many between them. If you get all tasks it will display the user related. If you go to Get one user for example(localhost:3000/api/v1/users/userId?) you will get a user including the list of task associated with this one.

In case of non-sql database I create two collections one of the users and the other for task. I could go for adding a whole task object in the task array of the user document, but this in a long term is not recomended, otherwise a better soluction would be adding the ids of the task created and then we can promp it from the task collection.

to test with Mongo db follow the followings intructions

. We need to add the mongo conection so go to the index file in the root of the app, and uncommend line 42
. We need to go to the routes files and shitch the services so go to user.route and lines that are using the postgress services and uncommend mongo services.
for example:

router.get('/', async (req, res, next) => {
try {
//const users = await service.find();
//res.json(users);
const usersMongo = await mongoUserService.find();
res.json(usersMongo);
} catch (error) {
next(error);
}
});

ONLY CREATE AND GET ALL ARE IMPLEMENTED FOR MONGO.

. Also you need to desactivate auth. Follow the steps of the first answer to desactivate auth.

4- How would you add testing automation to the implementation?

I add some tests, that you can run with the command: npm run test
This test scenarion are not taking care about auth so all them will fail at the beggining if you would like to see how the become successfull, eliminate the auth as I mention on answer 1 and add the IDs as the test asks.

Remeber that we can use services like github actions, bitbucket pipelines and jenkinst to excecute this commands.

5- Share the codebase and readme file on how to test it
DONE!

6- If asked to add on simple authentication for internal users, what direction would you take? How would that direction differ from authentication for REST APIs with third parties? Provide examples.

As youy see the auth layer is implemented, for internal users, using passport local strategy and JWT, they basically need to login i would check their credentianls and if they are users of the app, I will provide a token (I am not mannaging sessions or creating refresh tokens). They will need to provide that token for any manipulation of tasks (not taking care about authorization process, all are admins)

For Auth with third parties Rest APIs I will follow these exazmples:

1-
low level
. Use Auth 2.0 to generate APIs keys I can limit this access using session
. You can have a table to store those keys and verify for access

2-
enterprise lvl
.Define requirements and Scenarios
Before getting started, you need to identify what type of third parties will consume your API.
.Chose OAuth 2.0 or Auth0 protocole like : Authorization Code Flow or Implicit Flow
.Before a third party can use your API, they must register their application on your platform. Once registered, they are provided with a Client ID and a Client Secret.

When a user attempts to access a resource or function that requires authentication, the third-party application must redirect the user to your authentication server. Here are the following steps that occur:

.The user enters their credentials.
.Your server verifies those credentials.
.Once authenticated, your server sends an authorization code to the third-party app.
.The third-party app sends this authorization code along with its Client ID and Client Secret to your server.
.Your server verifies the information and, if valid, sends an Access Token to the third-party app.
.This token is used for all subsequent requests to your API until it expires. Once it expires, a Refresh Token can be used to obtain a new Access Token without the user needing to authenticate again.
.(optional) IPs white list.
.add RATE LIMMIT to controll request
.add security with https
.documment and test
. monitor and revocationn

3- Now days I am working a lot with Cognito AWS, it does all this feature for you. I could show.

\***\*Finally\*\***

Thanks for your time and considaration. Please let me know if you need any support to test the app or need more example of code for any aspect. Sorry for the delay I had some other project and jobs to work with and I did my best in my spare time. Hope to hear from you soon.
