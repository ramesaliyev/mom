# Technologies
- Docker
- Nest
- NodeJS
- PostgreSQL
- RabbitMQ
- Redis
- TypeScript

# Management Screens
- PostgreSQL: [localhost:7071](http://localhost:7071/)
  - system: PostgreSQL
  - server: postgresql_server
  - username: poc_db_user
  - password: poc_db_pass
  - database: poc_db_name
- RabbitMQ: [localhost:7072](http://localhost:7072/)
  - username: poc_rmq_user
  - password: poc_rmq_pass
- Redis: [localhost:7073](http://localhost:7073/)

# Tutorials for Better Understanding 
  - RabbitMQ
    https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
    https://github.com/rabbitmq/rabbitmq-tutorials/tree/master/javascript-nodejs
  - TypeScript
    https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
    https://www.typescriptlang.org/docs/handbook/basic-types.html

# Sandbox
There is a sandbox to make experiments with things. It mostly written in plain javascript by following tutorials etc. To enter in sandbox;

    $ docker exec -it poc_sandbox /bin/sh

And when you in, simply run scripts as you want;
    
    $ node rabbitmq-tutorial/hello-world/send.js

For example start two bash screen and send from one and receive from other.

# TODO
- Use RabbitMQ with rabbitmq-delayed-message-exchange [plugin](https://hub.docker.com/r/tetsuobe/rabbitmq-delayed-message-exchange/~/dockerfile/).