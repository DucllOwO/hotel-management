const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");
const app = express();
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());
app.use(compression());

app.listen(1205, async () => {
  console.log("server is running");
  const ent = await supabase.from("test1").select("*");
  console.log(ent);
});
