var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;

var User   = require('./UserModel');

var authSecrets = require('../../config/secrets');

module.exports = function(app){

	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions

	passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

     passport.use(new TwitterStrategy({

        consumerKey     : authSecrets.twitterAuth.consumerKey,
        consumerSecret  : authSecrets.twitterAuth.consumerSecret,
        callbackURL     : authSecrets.twitterAuth.callbackURL

    },
    function(token, tokenSecret, profile, done) {
    	console.log("HORRAY  " ,  profile.id);
        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });

    	});

    }));



    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback' ,
	    passport.authenticate('twitter', {
	        successRedirect : '/profile',
	        failureRedirect : '/'
	    })
	);

//     app.post("/login", passport.authenticate('local',
//     { failureRedirect: '/login',
//       failureFlash: true }), function(req, res) {
//         if (req.body.remember) {
//           req.session.cookie.maxAge = 1000 * 60 * 3;
//         } else {
//           req.session.cookie.expires = false;
//         }
//       res.redirect('/');
// });

    

    app.use(function(req, res , next) {
        req.internalParams = {
            loggedInUser : req.user,
            isLoggedIn : req.isAuthenticated()
        };
        next();
    });
    


}