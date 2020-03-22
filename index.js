const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

let artists = [
  {
    id: 1,
    name: "Metallica"
  },
  {
    id: 2,
    name: "Group 2"
  },
  {
    id: 3,
    name: "Jhonny Beach"
  }
];

app.get("/", function(req, res) {
  res.send("http://localhost:3001/static/map.png");
});

app.get("/artists", function(req, res) {
  res.send(artists);
});

app.get("/artists/:id", function(req, res) {
  const artist = artists.find(artist => {
    return artist.id == Number(req.params.id);
  });
  res.send(artist);
});

app.post("/artists", function(req, res) {
  const newArtist = {
    id: Date.now(),
    name: req.body.name
  };
  artists.push(newArtist);
  res.send(`added artist: ${newArtist} \n artists arr: ${artists}`);
});

app.put("/artists/:id", function(req, res) {
  const artist = artists.find(artist => {
    return artist.id == Number(req.params.id);
  });
  artist.name = req.body.name;
  res.sendStatus(200);
});

app.delete("/artists/:id", function(req, res) {
  artists = artists.filter(artist => {
    return artist.id != Number(req.params.id);
  });
  res.sendStatus(200);
});

const PORT = 3005;

app.listen(PORT, function() {
  console.log(`Server started! Port: ${PORT}`);
});
