https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html

routing mode

    # Create queus with binding key
    $ node rabbitmq/tutorial/routing/receive_logs_direct.js warning
    $ node rabbitmq/tutorial/routing/receive_logs_direct.js error
    $ node rabbitmq/tutorial/routing/receive_logs_direct.js info
    $ node rabbitmq/tutorial/routing/receive_logs_direct.js warning info
    $ node rabbitmq/tutorial/routing/receive_logs_direct.js error warning

    # Emit messages with same routing key
    $ node rabbitmq/tutorial/routing/emit_log_direct.js info user logged 
    $ node rabbitmq/tutorial/routing/emit_log_direct.js warning less disk space 
    $ node rabbitmq/tutorial/routing/emit_log_direct.js error alarm!!

- direct exchange used
- bindings

callbacks used