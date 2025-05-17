const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

//for checking
app.get("/check", (req, res) => {
  res.send("backend is running");
});

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

app.get("/",async(req,res)=>{
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
})

// app.get("/",async(req,res)=>{
//     const { userId } = req.params;
//     const result = await pool.query("SELECT * FROM product WHERE id = $1 ", [
//       userId,
//     ]);
//   res.json(result.rows);
// })



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));