const express = require("express");
const app = express();
const ejs = require("ejs")
const bodyParser = require('body-parser');
const db = require("./models")
const adminMenu = require("./routes/router.js")
const pdfGent = require("./routes/pdfrouter.js")
const path = require("path")
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config/config.json');
const dotenv = require('dotenv');
dotenv.config();
const GlobalDataMiddleware = require("./middleware/varMiddleware.js")
const methodOverride = require('method-override');
const authenticateUser = require('./middleware/authenticate');

const PORT = process.env.PORT || 3005;


const dbOptions = {
  host: config.development.host,
  port: config.development.port,
  user: config.development.username,
  password: config.development.password,
  database: config.development.database,
};

const sessionStore = new MySQLStore(dbOptions);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser());


app.use(session({
  secret: 'dashboard',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, 
    secure: false, 
    httpOnly: false, 
    rolling: true, 
  },
}));
app.use(flash());
app.use(methodOverride('_method'));


app.use(
  GlobalDataMiddleware.setBlogFooterList, 
  GlobalDataMiddleware.setSiteList,
  GlobalDataMiddleware.setCommentList,
  GlobalDataMiddleware.setCirriculumList,
  );
app.use(authenticateUser);

app.use("/", adminMenu);
app.use('/', pdfGent)




db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT);
    console.log("Database successfull")
});