const express = require('express');
const { engine } = require('express-handlebars');
const routes = require('./routes/');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./configs/db/config');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


// store mongoDB
const store = new MongoDBStore({
  uri: 'mongodb+srv://NguyenTienDat098:hetpass123@cluster0.tiqp7q4.mongodb.net/my_ice_cream_database?retryWrites=true&w=majority',
  collection: 'mySessions'
});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});


// connet database
db.connect();

// middleware
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname) + '/resources/views');
app.use('/public', express.static(path.join(__dirname + '/public')));

app.use(
  session({
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: {
      maxAge: 60000
    },
    store: store,
    saveUninitialized: true,
    resave: false
  })
);


app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// passport , session - cookies
app.use(passport.initialize());
app.use(passport.session());

// routes init
routes(app);

// port app listening
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
