require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require('cors')


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const localUserCheck = require("./middlewares/localUserCheck");
const cookieCheck = require("./middlewares/cookieCheck"); 
const app = express();

app.set("views", path.join(__dirname, "views")).set("view engine", "ejs");

app
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(methodOverride("_method"))
  .use(express.static(path.join(__dirname, "..","public")))
  .use(
  session({
    secret: "CodeIsLove&War",
    resave: false,
    saveUninitialized: true
  })
)
   .use(cookieCheck)
   .use(localUserCheck)
   .use(bodyParser.json())
   .use(cors())


/* rutas */
app
.use("/", indexRouter) // http://localhost:3000
.use("/users", usersRouter) //http://localhost:3000/users
.use("/courses", coursesRouter) // http:localhost:3000/courses

/* Api */

app

.use("/api/courses",require('./routes/api/courseApi'))
.use("/api/users",require('./routes/api/usersApi'))
.use("/api",require('./routes/api/mainApi'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
