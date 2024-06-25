// const request = require('request');
// const apiKey = process.env.API_KEY;

// const getHome = (req, res) => {
//   res.render('home');
// };

// const getDetails = (req, res) => {
//   const title = req.params.title;
//   const url = `http://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`;
//   request(url, { json: true }, (error, response, body) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).send('Error obtaining data');
//     }
//     if (body.Response === 'False') {
//       return res.status(404).send('Film not found');
//     }
//     res.render('film', {
//       title: body.Title,
//       director: body.Director,
//       year: body.Year,
//       genre: body.Genre,
//       plot: body.Plot,
//       poster: body.Poster,
//     });
//   });
// };

// const postFilm = (req, res) => {
//   const title = req.body.title;
//   res.redirect(`/film/${encodeURIComponent(title)}`);
// };


// module.exports = { getHome, getDetails, postFilm };