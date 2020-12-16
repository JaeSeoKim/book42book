import next from "next";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./src/auth";
import "./src/db";
import "./models/User";
import "./models/Book";
import "./models/BookInfo";

const dev = process.env.NODE_ENV !== "production";
if (dev) require("dotenv").config();

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  server.use(passport.initialize());
  server.use(passport.session());

  server.get(
    "/login",
    passport.authenticate("42", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  server.get(
    "/auth/42/callback",
    passport.authenticate("42", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`✅ Ready on http://localhost:${port}`);
  });
});
