const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("Database connection successful!");
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
