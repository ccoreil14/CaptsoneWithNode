/////////////////
//////ROUTING////
/////////////////
var User = require('./models/user');

module.exports = function (app, passport, path, pathYO) {
    var pagePathYO = pathYO + "Public/pages";
    
    
    
    app.get('/', function (req, res) {
        res.sendFile(path.join(pathYO + "/index.html"));
    });
    
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

     app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

     app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    
    app.get('/profile', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            res.render('teacherProfilePage.ejs', {
                user: req.user // get the user out of session and pass to template
            });
        } else {
            res.render('studentProfilePage.ejs', {
                user: req.user // get the user out of session and pass to template
            });
        }
    });
    
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}