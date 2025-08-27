import app from "./app.js";
import { Connectdb } from "./config/Database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

Connectdb();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
