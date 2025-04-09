import app from "./middleware/app.js";
import env from "dotenv";
env.config();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on:", process.env.PORT || 3000);
});
