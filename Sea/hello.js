// // var http = require('http');
// // var static = require('node-static');
// // var file = new static.Server('.');
// //
// // http.createServer(function(req, res) {
// //     file.serve(req, res);
// // }).listen(8080);
// //
// // console.log('Server running on port 8080');
//
// const express = require('express');
// const app = express();
//
// const port = process.env.port || 3000;
//
// app.get('/', (req, res) => {
//     res.send('Hello world !');
// });
//
// app.listen(port, () =>
//     console.log('Express web app available at localhost: ${port}')
// );

// const express = require('express');
// const app = express();
// const articles = [{ title: 'Example' }];
// const bodyParser = require('body-parser');
//
// app.set('port', process.env.PORT || 3000);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.get('/articles', (req, res, next) => {res.send(articles);
// });
// app.post('/articles', (req, res, next) => {
//     const article = { title: req.body.title};
//     article.push(article);
//     res.send('OK');
// });
// app.get('/articles/:id', (req, res, next) => {
//     const id = req.params.id; console.log('Fetching:', id); res.send(articles[id]);
// });
// app.delete('/articles/:id', (req, res, next) => {
//     const  id = req.params.id;
//     console.log('Deleting: ', id);
//     delete articles[id];
//     res.send({message: 'Deleted'})
// });
//     app.listen(app.get('port'), () => {
//         console.log('App started on port', app.get('port'));
//     });
//     module.exports = app;

