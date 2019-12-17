const knex = require("../../data/dbConfig");
const usersCRUD = require("../usersCRUD");

module.exports = {
  get: usersCRUD.get,
  getByUsername,
  insert: usersCRUD.insert
};

function getByUsername(username) {
  return knex
    .select("*")
    .from("users")
    .where({ username: username });
}