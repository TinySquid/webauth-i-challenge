const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  return knex('users').insert([
    { username: 'crazyCat', password: bcrypt.hashSync("weak-password", 8) },
    { username: 'rarePupper', password: bcrypt.hashSync("123456", 8) },
    { username: 'AmSnek', password: bcrypt.hashSync("reptile", 8) },
  ]);
};
