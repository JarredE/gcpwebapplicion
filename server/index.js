const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require('nodemailer');
const path = require('path');
require("dotenv").config();
var bodyParser = require('body-parser');
const handle = require('nodemailer-express-handlebars');
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');
global.__basedir = __dirname;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models");

const Referral = db.unfdb;

// Routers

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const referralRouter = require("./routes/Referrals");
app.use("/referrals", referralRouter);
const locationsRouter = require("./routes/Locations");
app.use("/locations", locationsRouter);
const announcementsRouter = require("./routes/Announcements");
app.use("/announcements", announcementsRouter);
const formsRouter = require("./routes/Forms");
app.use("/forms", formsRouter);

//-------Begin email stuff---------//

//Referral Fulfilled Notif Email
app.post("/fulfilled-email", cors(), async(req, res) => {
  let {text} = req.body;
  let {email} = req.body;
  let {subject} = req.body;
  let {referralID} = req.body;
  let {student_initials} = req.body;
  let {firstname} = req.body;
  let {pickuplocation} = req.body


  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'email-templates',
      layoutsDir: 'email-templates',
      defaultLayout: ''
    },
    viewPath: 'email-templates',
    extName: '.handlebars',
  };

  transport.use('compile', handle(handlebarOptions));

  transport.sendMail({
  from: process.env.MAIL_FROM,
  to: `${email}`,
  subject: `${subject}`,
  template: 'fulfilled',
  context: {
    id: `${referralID}`,
    text: `${text}`,
    student_initials: `${student_initials}`,
    firstname: `${firstname}`,
    pickuplocation: `${pickuplocation}`
  }
  })
})
//generate referral pdf with dynamic data
app.post('/create-pdf', (req, res) => {

  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {


      if (err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

//Referral Received Email
app.post("/confirmation-email", cors(), async(req, res) => {
  let {text} = req.body;
  let {email} = req.body;
  let {subject} = req.body;
  let {student_initials} = req.body;
  let {firstname} = req.body;
  let {pickuplocation} = req.body


  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'email-templates',
      layoutsDir: 'email-templates',
      defaultLayout: ''
    },
    viewPath: 'email-templates',
    extName: '.handlebars',
  };

  transport.use('compile', handle(handlebarOptions));

  transport.sendMail({
  from: process.env.MAIL_FROM,
  to: `${email}`,
  subject: `${subject}`,
  template: 'confirmation',
  context: {
    text: `${text}`,
    student_initials: `${student_initials}`,
    firstname: `${firstname}`,
    pickuplocation: `${pickuplocation}`
  }
  })
})
//Referral received text email
app.post("/confirmation-text", cors(), async(req, res) => {
  let {text} = req.body;
  let {email} = req.body;
  let {subject} = req.body;
  let {student_initials} = req.body;
  let {firstname} = req.body;
  let {pickuplocation} = req.body


  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'email-templates',
      layoutsDir: 'email-templates',
      defaultLayout: ''
    },
    viewPath: 'email-templates',
    extName: '.handlebars',
  };

  transport.use('compile', handle(handlebarOptions));

  transport.sendMail({
  from: process.env.MAIL_FROM,
  to: `${email}`,
  subject: `${subject}`,
  text: `${text}`,
  template: 'confirmation-textonly',
   context: {
     text: `${text}`,
     student_initials: `${student_initials}`,
     firstname: `${firstname}`,
     pickuplocation: `${pickuplocation}`
  }
  })
})

//registration welcome email
app.post("/welcome-email", cors(), async(req, res) => {
  let {text} = req.body;
  let {email} = req.body;
  let {subject} = req.body;
  let {username} = req.body;
  let {firstname} = req.body;
  let {password} = req.body


  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'email-templates',
      layoutsDir: 'email-templates',
      defaultLayout: ''
    },
    viewPath: 'email-templates',
    extName: '.handlebars',
  };

  transport.use('compile', handle(handlebarOptions));

  transport.sendMail({
  from: process.env.MAIL_FROM,
  to: `${email}`,
  subject: `${subject}`,
  template: 'welcome',
  context: {
    text: `${text}`,
    username: `${username}`,
    firstname: `${firstname}`,
    password: `${password}`
  }
  })
})

//Referral on Hold Email

//Referral In Progress Email

//Referral Fulfilled Notif Email
app.post("/fulfilled-text", cors(), async(req, res) => {
  let {text} = req.body;
  let {email} = req.body;
  let {subject} = req.body;
  let {referralID} = req.body;
  let {student_initials} = req.body;
  let {firstname} = req.body;
  let {pickuplocation} = req.body


  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: 'email-templates',
      layoutsDir: 'email-templates',
      defaultLayout: ''
    },
    viewPath: 'email-templates',
    extName: '.handlebars',
  };

  transport.use('compile', handle(handlebarOptions));

  transport.sendMail({
  from: process.env.MAIL_FROM,
  to: `${email}`,
  subject: `${subject}`,
  text: `${text}`,
  template: 'fulfilled-textonly',
   context: {
     id: `${referralID}`,
     text: `${text}`,
     student_initials: `${student_initials}`,
     firstname: `${firstname}`,
     pickuplocation: `${pickuplocation}`
  }
  })
})



//---------End email stuff----------//

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});