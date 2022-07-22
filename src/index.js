const express = require('express');
const { engine } = require('express-handlebars');
const routes = require('./routes/');
const path = require('path');
const app = express();
const port = 3000;


//JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
	extended: true,
}))

// routes init
routes(app);

// express-handlebars init
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname) , 'resources' , 'views');

// port app listening
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})