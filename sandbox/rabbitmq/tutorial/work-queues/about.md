https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html

work queues with more advanced fair-dispatch mode.

    ack: false
    durable & persist: true
    prefetch: 1

    $ node rabbitmq/tutorial/work-queues/new-task.js .......j1
    $ node rabbitmq/tutorial/work-queues/new-task.js .......j2
    
    every dot makes job duration one second longer
        
callbacks used