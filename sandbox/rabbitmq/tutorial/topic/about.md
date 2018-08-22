https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html

topic mode

    Listen for topics.
    $ node rabbitmq/tutorial/topic/receive_logs_topic.js "#"
    $ node rabbitmq/tutorial/topic/receive_logs_topic.js "kern.*"
    $ node rabbitmq/tutorial/topic/receive_logs_topic.js "*.critical"
    $ node rabbitmq/tutorial/topic/receive_logs_topic.js "kern.*" "*.critical"

    Emit messages with topics.
    $ node rabbitmq/tutorial/topic/emit_log_topic.js "kern.critical" "A critical kernel error"
    $ node rabbitmq/tutorial/topic/emit_log_topic.js "something.different" "Unknown error"
    $ node rabbitmq/tutorial/topic/emit_log_topic.js "web.critical" "Web server down"

- topic exchange used
- bindings

callbacks used