import app, { port } from "./app";
import mongoose from "mongoose";
import { config } from "./app/config/config";
import { seedAdmin } from "./app/middlewares/seedAdmin";

async function main() {
  await mongoose.connect(config.database_url as string);
  console.log('mongoose connect ')
  seedAdmin()
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().catch((err) => console.log(err));
