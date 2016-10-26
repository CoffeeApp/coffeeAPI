
gaa && gcmsg "Add coffee desc in seed file" && knex migrate:rollback && knex migrate:latest && knex seed:run && ggp && git push heroku master && heroku run knex migrate:rollback && heroku run knex migrate:latest && heroku run knex seed:run
