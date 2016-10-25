knex migrate:rollback && knex migrate:latest && knex seed:run
gaa && gcmsg "Add ready_time to order table" && ggp && git push heroku master
heroku run knex migrate:rollback && heroku run knex migrate:latest && heroku run knex seed:run
