const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 3005;

app.use(bodyParser.json());

var serverArr = [
  {
    name: "Tim",
    color: "blue"
  },
  {
    name: "Kermit",
    color: "green"
  },
  {
    name: "Bob Ross",
    color: "all of them"
  }
];

app.get("/api/dog", (req, res) => {
  res.status(200).send(serverArr);
});

app.post("/cat", (req, res) => {
  let { input, color } = req.body;

  serverArr.push({
    name: input,
    color: color
  });
  res.status(200).send(serverArr);
});

app.delete("/pizza-crumbs/:barney", (req, res) => {
  serverArr.splice(req.params.barney, 1);
  res.status(200).send(serverArr);
});

app.put("/pizza-crumbs/:id", (req, res) => {
  let answerArr = serverArr.map((val, i) => {
    if (i === +req.params.id) {
      return { name: req.body.name, color: val.color };
    } else {
      return val;
    }
  });
  serverArr = [...answerArr];
  res.status(200).send(serverArr);
});

app.listen(port, console.log("Magic Happens on Port: " + port));
