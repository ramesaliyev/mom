# MOM Based Architecture POC
This is a demonstration of how to create simple yet capable architecture with [MOM](https://www.wikiwand.com/en/Message-oriented_middleware) (Message-Oriented-Middleware) approach to achieve well scalable and distributed systems. On the tip of the [iceberg](https://www.wikiwand.com/en/Iceberg) we're only seeing an admin panel, where you can register, login, order and list jobs etc. But under the hood (or below the sea level?) whole app running by queuing messages to do things.

Here is a diagram to visualise how our architecture works.

<p align="center"><img src="./assets/architecture-diagram.png" alt="Architecture Diagram" /></p>

# Table of Contents
- [Core Concept](#core-concept)
- [Additional Pieces](#additional-pieces)
  - [Sandbox](#sandbox)
  - [Scripts](#scripts)
- **[Installation and Running](#installation-and-running)**
  - [Cloning Repo](#cloning-repo)
  - [Start Everything](#start-everything)
  - [Start Only Data Services](#start-only-data-services)
  - [Stopping a Service](#stopping-a-service)
  - [Starting a Service with Rebuild](#starting-a-service-with-rebuild)
  - [Starting a Service outside of Docker](#starting-a-service-outside-of-docker)
- [Technologies Used](#technologies-used)
- [Management Screens](#management-screens)
- [Connection Points](#connection-points)
- [Using Sandbox](#using-sandbox)
- [Debugging](#debugging)
- [Resources for Better Understanding](#resources-for-better-understanding)

# Core Concept
The core concept is; when there is a work which need to be done; services wont communicate to related service directly. Instead of that they will leave a message to message queue, which will be consumed by service (worker) that responsible of that work.

For example, in traditional systems when an user want to register, he or she calls the api and api will create a new db record and return some response to user. But here, API doesn't create db record itself, instead of that; it leaves a message to message queue which have details about what should be done (and data like email, password etc.) and waits for some db-worker to take care of it.

This *waiting* technique actually named [RPC](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html) and it means that message leaver will wait until job is done, and will do something with returned data (like informing user directly by returning a response). We're using RPC only in jobs like user register or job creation for make an example. RPC messages will have top priority (10) which cause them to be processed by worker before ordinary (lower priority) messages.

On the other hand, there are jobs which are not in a hurry and needs to be done **sometime**. Like math tasks. There is a screen in panel where you can schedule math tasks. Like sum or multiply these numbers etc. And there is a math-worker inside worker service which will call another external math service to get results of this calculations. And to inform user after these kind of deferred works, we're using socket connections. (Our math service will respond between 0~10 second delay for demonstration purposes.)

But what if user not in panel and there is no socket connection? Well, after a deferred task, beside trying to inform user over socket, of course we should also persist result of that job into database. (By leaving a message to message queue for db-worker.) So even user not in panel, he/she will see information on next login. (I didnt implement this, but this is the idea.)

# Additional Pieces
## Sandbox
Seperated from our main application; the purpose of sandbox is making experiments for grasp better understanding over concepts, libraries etc. For more information and to learn how to use sandbox see [using sandbox](#using-sandbox) section.

## Scripts
Some bash scripts to use when needed.

# Installation and Running
To install and run application you only need to have installed and running [docker](https://www.docker.com/products).

## Cloning Repo
    git clone git@github.com:ramesaliyev/mom.git

## Start Everything
    docker-compose up --build

**Starting everything will take some time**, so be patient. When everything has started you can;
  - Navigate to admin panel at [localhost:9090](http://localhost:9090/)
  - See other [management screens](#management-screens)

## Start Only Data Services
    docker-compose up postgresql_server postgresql_adminer rabbitmq_server redis_server redis_commander

## Stopping a Service

    docker-compose stop <servicename>

    # example
    docker-compose stop api

## Starting a Service with Rebuild

    docker-compose up --build <servicename>

    # example
    docker-compose up --build api

## Starting a Service outside of Docker
You can start every service outside of docker.

1- Navigate to service folder.

    cd services/be-api

2- Install dependencies.

    npm i

3- Start in development mode.

    npm start

4- Or Production mode.

    npm run start:prod

Notices:
  1. In docker every service starts in production mode by default.
  2. There is no watch mode in development. So you need to restart a service if you change something.
  3. You need to rebuild docker image if you want to start a service in docker after you change something.

# Technologies Used
- Backend
  - [Docker](https://www.docker.com/)
  - [JWT](https://jwt.io/)
  - [NodeJS](https://nodejs.org/)
    - [AMQP.Node](https://github.com/squaremo/amqp.node)
    - [Nest Framework](https://nestjs.com/)
    - [TypeORM](http://typeorm.io/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [RabbitMQ](https://www.rabbitmq.com/)
    - [Delayed Message Exchange](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange)
    - [Management](https://github.com/rabbitmq/rabbitmq-management)
  - [Redis](https://redis.io/)
  - [Socket.io](https://socket.io/)
  - [TypeScript](https://www.typescriptlang.org/)
- Frontend
  - [Axios](https://github.com/axios/axios)
  - [Material-UI](https://material-ui.com/)
  - [React](https://reactjs.org/)
  - [React-Router](https://github.com/ReactTraining/react-router)
  - [Redux](https://redux.js.org/)
  - [Redux-Saga](https://github.com/redux-saga/redux-saga)

# Management Screens
- Our Panel: [localhost:9090](http://localhost:9090/)
- PostgreSQL: [localhost:9091](http://localhost:9091/)
  - **system:** *PostgreSQL*
  - **server:** *postgresql_server*
  - **username:** *poc_db_user*
  - **password:** *poc_db_pass*
  - **database:** *poc_db_name*
- RabbitMQ: [localhost:9092](http://localhost:9092/)
  - **username:** *poc_rmq_user*
  - **password:** *poc_rmq_pass*
- Redis: [localhost:9093](http://localhost:9093/)

#  Connection Points
- API:
  - **hostname:** localhost:7070
- Socket:
  - **hostname:** localhost:7080
- External Math Service API:
  - **hostname:** localhost:7090
- PostgreSQL
  - **hostname:** localhost:7071
  - *others same as above*
- RabbitMQ
  - **hostname:** localhost:7072
  - *others same as above*
- Redis
  - **hostname:** localhost:7073

# Using Sandbox
There is a sandbox to ease making experiments with things. It consist of mostly little scripts written in plain javascript by following tutorials etc. You can add something under the sandbox and run it within container. Since folder already added as volume you dont need to restart anything. To enter in sandbox;

    docker exec -it poc_sandbox /bin/sh

And when you in, simply run scripts as you want;

    node rabbitmq/tutorial/hello-world/send.js

Create a new terminal window and run the receiver also;

    node rabbitmq/tutorial/hello-world/receive.js

You can run multiple receivers to observe things.

# Debugging
These debug instructions are for VSCode only.

## Frontend
1. Install latest version of [VS Code](https://code.visualstudio.com/) and [VS Code Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome).

2. Start your app (outside of the docker) by running `npm start`.

3. Now start debugging in VS Code by choosing correct configuration (ex: `Fe/Panel`).

4. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code, all from your editor.

## Services

1. Navigate to `.ts` file you would want to debug.

2. Now start debugging in VS Code by choosing correct configuration (ex: `Be/Api`).

3. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code, all from your editor.

For example: you want to debug api, navigate to `src/modules/auth/auth.controller.ts` and add breakpoint to `login` method. Then in postman or from frontend, trigger the api.

# Resources for Better Understanding
  - Docker
    - [Building Efficient Dockerfiles - Node.js](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)
  - MOM
    - [Wikipedia](https://www.wikiwand.com/en/Message-oriented_middleware)
  - RabbitMQ
    - [Dictionary](/sandbox/rabbitmq/about.md)
    - Official
      - [JS Tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)
      - [Github Repo of Tutorial](https://github.com/rabbitmq/rabbitmq-tutorials/tree/master/javascript-nodejs)
      - [AMQP Concepts](https://www.rabbitmq.com/tutorials/amqp-concepts.html)
      - [Documentation](https://www.rabbitmq.com/documentation.html)
      - [Queues](https://www.rabbitmq.com/queues.html)
    - Other
      - [AMQP.Node API Reference](http://www.squaremobius.net/amqp.node/channel_api.html)
      - [What is RabbitMQ?](https://www.cloudamqp.com/blog/2015-05-18-part1-rabbitmq-for-beginners-what-is-rabbitmq.html)
      - [Getting Started with RabbitMQ and NodeJS](https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html)
      - [Management Interface](https://www.cloudamqp.com/blog/2015-05-27-part3-rabbitmq-for-beginners_the-management-interface.html)
      - [RabbitMQ Exchanges, Routing Keys and Bindings](https://www.cloudamqp.com/blog/2015-09-03-part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html)
      - [RabbitMQ and NodeJS, A better way.](https://kimambo.de/a-better-way-to-work-with-rabbitmq-and-nodejs/)
      - [How To Do User Notifications From RabbitMQ Messages](https://derickbailey.com/2015/09/21/how-to-do-user-notifications-from-rabbitmq-messages/)
  - TypeScript
    - [In 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
    - [Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)