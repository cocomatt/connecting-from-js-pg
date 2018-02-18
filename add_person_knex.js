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

const arg = process.argv.slice(2);

function AddFamousPeopleByNameAndDOB(arg) {
  const inputFirstName = arg[0].toString();
  const inputLastName = arg[1].toString();
  const inputDOB = arg[2].toString();
  console.log('arg[0]: ', inputFirstName);
  console.log('arg[1]: ', inputLastName);
  console.log('arg[2]: ', inputDOB);
  knex('famous_people')
    .insert({
      first_name: inputFirstName,
      last_name: inputLastName,
      birthdate: inputDOB
    })
    .then(function (record) {
      return record;
    })
  knex.destroy();
}

AddFamousPeopleByNameAndDOB(arg);











/*function getAllFamousPeople(callback) {
  var rows = [];
  knex('famous_people')
    .select('*')
    .asCallback((err, rows) => {
      rows = rows.push(rows);
    })
}

    .select('*')
    .from('famous_people')
//    .asCallback((err, rows) => {
      console.log(`- ${id}: ${first_name} ${last_name}, born '${birthdate}'`);
//    });
  knex.destroy();
};
*/
/*function LookupFamousPeopleByName(name) {
  knex
    .select('*')
    .from('famous_people')
    .where('first_name', 'like', `%${name}%`)
    .orWhere('last_name', 'like', `%${name}%`)
    .asCallback((err, rows) => {
      displayFamousPeople(rows);
    });
  knex.destroy();
};*/

//LookupFamousPeopleByName(arg);

//displayAllFamousPeople();

/*function AddFamousPeopleByNameAndDOB(arg) {
  const inputId = '';
  const inputFirstName = arg[0].toString();
  const inputLastName = arg[1].toString();
  const inputDOB = arg[2].toString();
  console.log('arg[0]: ', inputFirstName);
  console.log('arg[1]: ', inputLastName);
  console.log('arg[2]: ', inputDOB);
  knex('famous_people')
    .returning('id')
    .insert([
      {id: inputId},
      {first_name: inputFirstName},
      {last_name: inputLastName},
      {birthdate: inputDOB}
    ])
    .asCallback((err, rows) => {
    displayAllFamousPeople(rows);
    });
  knex.destroy();
};

*/


/*function LookupFamousPeopleByName(name) {
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
*/
//AddFamousPeopleByNameAndDOB(arg);