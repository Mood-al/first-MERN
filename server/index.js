const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Friend = require("./modals/friends");
const cors = require("cors");
const URI = require("./hiddenVars/keys");
const app = express();
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
// app.use(bodyParser);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.post("/add", async (req, res) => {
  const friend = await Friend({
    name: req.body.name,
    age: Number(req.body.age),
  });
  friend.save();
  res.send(friend);
});
app.get("/get", async (req, res) => {
  await Friend.find({}, (err, resault) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resault);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  Friend.findByIdAndDelete(id).then((resault) => {
    res.send(resault);
  });
});
app.listen(3001, () => console.log("listening to 3001"));

app.put("/update", async (req, res) => {
  console.log(req.body);
  await Friend.findById(req.body.id, (err, resault) => {
    resault.age = Number(req.body.age);
    resault.save();
  });
  res.send("updated");
});
