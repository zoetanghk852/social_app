const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const saltRounds = 12;

let pool = null;
const mysql = require("mysql2");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/register", async (req, res) => {
  let { username, password } = req.body;
  const [user] = await pool.execute(
    `select userName from user where userName=?`,
    [username]
  );

  if (user.length === 0) {
    if (username && password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await pool.execute("INSERT INTO user(userName , password) VALUES(?,?)", [
        username,
        hashedPassword,
      ]);
      return res.json({ success: true });
    } else {
      return res.json({
        success: true,
        message: "success",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "user is already token,Please use another username.",
    });
  }
});

app.post("/login", (req, res) => {
  return res.json({
    success: true,
    message: "success",
  });
});

const port = 3001;
// app.listen(port, () => {
//   console.log(`social app listening on port ${port}`);
// });

app.listen(port, () => {
  console.log(` sever running ${port}`);
  pool = mysql
    .createPool({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "root",
      database: "social_app",
    })
    .promise();
});
