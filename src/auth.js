import passport from "passport";
import { Strategy } from "passport-42";
import User from "../models/User";

const dev = process.env.NODE_ENV !== "production";
if (dev) require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.FORTYTWO_APP_ID,
      clientSecret: process.env.FORTYTWO_APP_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/42/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const isExistUser = await User.findOne({ id: profile.id });
        if (isExistUser) {
          return cb(null, isExistUser);
        }
        const isStaff = profile["staff?"];
        const newUser = await User.create({
          id: profile.id,
          intra_id: profile.username,
          level: isStaff ? 0 : 3,
        });
        return cb(null, newUser);
      } catch (error) {
        return cb(error);
      }
    }
  )
);
