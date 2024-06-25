const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = process.env.API_KEY;

//middlewares
const morgan = require("./middlewares/morgan.js");
// Logger
app.use(morgan(':method :host :url :status :param[id] - :response-time ms :body'));
app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(bodyParser.urlencoded({ extended: true })); // Habilito recepción de formularios en servidor
//configuracion de vistas PUG - motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/film/:title', (req, res) => {
  const title = req.params.title;
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
  const poster = `http://img.omdbapi.com/?apikey=${apiKey}&${title}`;
  request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.error(error);
      return res.status(500).send('There was an error');
    }
    if (body.Response === 'False') {
      return res.status(404).send('Film not found');
    }
    res.render('film', {
      title: body.Title,
      director: body.Director,
      year: body.Year,
      genre: body.Genre,
      plot: body.Plot,
      poster: body.Poster
    });
  });
});

app.post('/film', (req, res) => {
  const title = req.body.title;
  res.redirect(`/film/${encodeURIComponent(title)}`);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});