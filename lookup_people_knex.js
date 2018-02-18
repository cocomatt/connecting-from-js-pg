const settings = require("./settings"); //settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const arg = process.argv.slice(2).toString();

function displayFamousPeople(results) {
  results.forEach(function(val, index) {
    const id = results[index].id;
    const firstName = results[index].first_name;
    const lastName = results[index].last_name;
    const dateOfBirth = results[index].birthdate;
    console.log(`- ${id}: ${firstName} ${lastName}, born '${dateOfBirth}'`);
  });
};

function LookupFamousPeopleByName(name) {
  knex
    .select('*')
    .from('famous_people')
    .where('first_name', 'like', `%${name}%`)
    .orWhere('last_name', 'like', `%${name}%`)
    .asCallback((err, rows) => {
      displayFamousPeople(rows);
    });
  knex.destroy();
};

LookupFamousPeopleByName(arg);