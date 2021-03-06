var createError = require('http-errors');
var express = require('express');
// var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./utils/config.js');

var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth-router.js');
const userRouter = require('./routes/user-router.js');
const tourRouter = require('./routes/tour-router.js');

var cors = require('cors');


//

var app = express();

app.use(cors());
// That’s it. CORS is now enabled. If you make a request to your app, you will notice a new header being returned: Access-Control-Allow-Origin: *

// create application/json parser
// var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json());


// INIT
if (true) {
  console.log('***** initial');
}

// TESTING ROUTING
/*
for testing type in browser adressbar:
http://localhost:3001/
http://localhost:3001/test
http://localhost:3001/testnest
http://localhost:3001/testnest/test
*/
var testNestedRouter = express.Router();
testNestedRouter.route('/')
  .get(function (req, res) {
    res.status(200)
      .send('testNestedRouter is nested in /testnest - route: /');
  });
testNestedRouter.route('/test')
  .get(function (req, res) {
    res.status(200)
      .send('testNestedRouter is nested in /testnest - route: /test');
  });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// PARSERS
app.use(express.json()); // It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// You should use the parser middleware before the route declaration part


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', function (req, res) {
  res.status(200)
    .send('root route: /test  (also try /testnest and /testnest/test)');
});
app.use('/testnest', testNestedRouter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/tour', tourRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('***** READY');

module.exports = app;
