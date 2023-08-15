# TODO-List

A TODO list using node

For this project I will use postgresql in a docker container. Said this to test this aplication, is important to have docker install (https://docs.docker.com/desktop/install/windows-install/).

Docker instructions:
.create in the root of the project the folder postgres_data to storage all data related with the database(the postgres image has a volume for persistance )

docker-compose up -d postgres => run postgres in docker

****\*****OPTIONAL****\*\*****

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

****\*****OPTIONAL****\*\*****
