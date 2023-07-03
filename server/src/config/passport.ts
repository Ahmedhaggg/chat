import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { CLIENT_ID, CLIENT_SECRET } from "./index";

passport.use(
	new GoogleStrategy(
		{
			clientID: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			callbackURL: "http://localhost/api/v1/user/auth/google/callback",
            passReqToCallback: true,
			scope: ["profile", "email"],
		},
		function (request, accessToken, refreshToken, profile, done) {
			console.log(request, accessToken, refreshToken, profile)
            return done(null, profile);
        }
	)
);