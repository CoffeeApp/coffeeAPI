knex migrate:rollback && knex migrate:latest && knex seed:run
gaa && gcmsg "Seed change" && ggp && git push heroku master
heroku run knex migrate:rollback && heroku run knex migrate:latest && heroku run knex seed:run
