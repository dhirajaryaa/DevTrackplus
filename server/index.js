import app from "./app.js";
import connectDB from "./db/index.js";
import { PORT } from "./config/env.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Listen on ", PORT);
    });
  })
  .catch((error) => {
    console.error("Database fail to connect", error);
  });
