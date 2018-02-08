const pg = require("pg");
const settings = require("./settings"); //settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const arg = process.argv.slice(2).toString();

function LookupFamousPeopleByName(name) {
  const query = `SELECT * FROM famous_people WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%'`;
  return query;
};

function displayFamousQuery(results) {
  results.forEach(function(val, index) {
    const id = results[index].id;
    const firstName = results[index].first_name;
    const lastName = results[index].last_name;
    const dateOfBirth = results[index].birthdate;

    console.log(`- ${id}: ${firstName} ${lastName}, born '${dateOfBirth}'`);
  });
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(LookupFamousPeopleByName(arg), (err, result) => {
    if (err) {
      return console.error("Error running query", err);
    }
    console.log("Searching ...");
    console.log(`Found ${result.rowCount} person(s) by the name '${arg}':`);
    displayFamousQuery(result.rows);

    client.end();
  });
});