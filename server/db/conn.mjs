import { MongoClient, ServerApiVersion } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

let conn;
try {
  conn = await client.connect();
  console.log("connecting");
  await client.db("admin").command({ ping: 1 });
  console.log("You successfully connected to MongoDB!");
  //   await listDatabases(client);
} catch (e) {
  console.error(e);
  process.exit();
}
const db = conn.db("sample_mflix");
const collection = db.collection("embedded_movies");

export {
  db,
  collection
}
