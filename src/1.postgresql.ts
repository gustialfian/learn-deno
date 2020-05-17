import { Client } from "https://deno.land/x/postgres/mod.ts";

main();

async function main() {
  const client = new Client({
    user: "sandbox",
    password: "sandbox",
    database: "sandbox",
    hostname: "localhost",
    port: 5432,
  });

  await client.connect();

  await client.query("truncate item;");
  await select(client);
  await insert(client);
  await update(client);
  await destroy(client);
  await select(client);

  await client.end();
}

const itemsSeed = [
  { name: "deno", count: 1 },
  { name: "v8", count: 8 },
  { name: "ts", count: 3 },
  { name: "update", count: 0 },
  { name: "delete", count: 0 },
];

async function insert(client: Client) {
  console.log('insert: ');
  
  const sqlTemplate =
    "insert into item (name, count, updated_at) values ($1, $2, now()) returning *;";
  for (const item of itemsSeed) {
    const values = Object.values(item);
    const result = await client.query(sqlTemplate, ...values);
    console.log(result.rows);
  }

  console.log();
}

async function select(client: Client) {
  console.log('select');
  
  const sql = `select * from item;`;
  const result = await client.query(sql);
  console.log(result.rows);

  console.log();
}

async function update(client:Client) {
  console.log('update');
  
  const sql = `update item set name=$1 where name='update' returning *;`
  const result = await client.query(sql, 'updated');
  console.log(result.rows);

  console.log();
}

async function destroy(client:Client) {
  console.log('destroy');
  
  const sql = `delete from item where name='delete' returning *;`
  const result = await client.query(sql);
  console.log(result.rows);

  console.log();
}
