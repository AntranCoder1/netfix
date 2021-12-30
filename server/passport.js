const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const User = require('./models/Users.models');

const GOOGLE_CLIENT_ID = "718778022741-nqeapv7qq7no0vs77v5dv2s70jcbcdnf.apps.googleusercontent.com" ;
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
   function (accessToken, refreshToken, profile, done) {
        done(null, profile);
//     const newUser = {
//         googleId: profile.id,
//         displayName: profile.displayName,
//         firstName: profile.name.firstName,
//         lastName: profile.name.lastName,
//         profilePic: profile.photos[0].value,
//     }

//     try {
//         let user = await User.findOne({ googleId: profile.id  })

//         if (user) {
//             done(null, user)
//         } else {
//             user = await User.create(newUser)
//             done(null, user)
//         }
//     } catch (error) {
//         console.log(error);
//     }
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})