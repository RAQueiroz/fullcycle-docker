import http from 'http'
import mysql from 'mysql'

const { PORT } = process.env

const connection = mysql.createConnection({
  host     : 'db',
  user     : 'node-db',
  password : 'node-db-pwd',
  database : 'node-db'
})

function query(queryStr) {
  return new Promise((resolve, reject) => {
    connection.query(queryStr, function (error, results) {
      if (error) reject(error)
      resolve({ results })
    });
  })
}

async function seedDb() {
  await query('CREATE TABLE if not exists people(id int not null auto_increment, name varchar(255), primary key(id))')
  const { results } = await query(`SELECT name FROM people WHERE id = 1`)
  if(!results[0]){
    await query(`INSERT INTO people(name) values('Rocks')`)
  }
}

async function handlers(_, res) {
  try {
  const {results} = await query('SELECT * FROM people')
  res.write(`<h1>Full Cycle <em>${results[0].name}</em>!</h1>`)
  res.end()
  } catch (e) {
    res.write(JSON.stringify(e))
    res.end()
  }
}

export const server = http
  .createServer(handlers)
  .listen(PORT, async () => {
    await seedDb()
    console.info(`Listening on port ${PORT}.`)
  })
  .on('close', () => { connection.end() })
