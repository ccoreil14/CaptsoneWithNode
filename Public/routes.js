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


    app.get('/home', function (req, res) {
        res.render('index.ejs', {
            user: req.user
        });
    });

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

    app.post('/profile', function (req, res) {
        User.findOne({
            local: {
                email: req.user.local.email
            }
        }, function (err, user) {
            req.user.local.email = req.body.newEmail;
            if (req.body.newPassword.length > 0) {
                req.user.local.password = req.body.newPassword;
            }
            req.user.local.profilePic = req.body.newPic;
            req.user.local.profileBio = req.body.newBio;
            req.user.local.profileColor = req.body.newColor;
            req.user.save();
            res.redirect('/profile');
            if (err) throw err;
        });

    });

    app.get('/shapelist', isLoggedIn, function (req, res) {
        res.render('shapeListPage.ejs', {
            user: req.user
        });
    });

    //circle stuff

    app.get('/circAreaLesson', isLoggedIn, function (req, res) {
        res.render('circAreaLesson.ejs', {
            user: req.user
        });
    });

    app.get('/circExam', isLoggedIn, function (req, res) {
        res.render('circExam.ejs', {
            user: req.user
        });
    });

    app.get('/circleWorkshop', isLoggedIn, function (req, res) {
        res.render('circleWorkshop.ejs', {
            user: req.user
        });
    });

    app.get('/circumfrenceLesson', isLoggedIn, function (req, res) {
        res.render('circumfrenceLesson.ejs', {
            user: req.user
        });
    });
    //circle stuff


    //square stuff

    app.get('/perimeterLesson', isLoggedIn, function (req, res) {
        res.render('perimeterLesson.ejs', {
            user: req.user
        });
    });

    app.get('/rectAreaLesson', isLoggedIn, function (req, res) {
        res.render('rectAreaLesson.ejs', {
            user: req.user
        });
    });

    app.get('/squareExam', isLoggedIn, function (req, res) {
        res.render('squareExam.ejs', {
            user: req.user
        });
    });

    app.get('/squareWorkshop', isLoggedIn, function (req, res) {
        res.render('squareWorkshop.ejs', {
            user: req.user
        });
    });

    //square stuff


    //prism stuff

    app.get('/cubeWorkshop', isLoggedIn, function (req, res) {
        res.render('cubeWorkshop.ejs', {
            user: req.user
        });
    });

    app.get('/prismExam', isLoggedIn, function (req, res) {
        res.render('prismExam.ejs', {
            user: req.user
        });
    });

    app.get('/prismSALesson', isLoggedIn, function (req, res) {
        res.render('prismSALesson.ejs', {
            user: req.user
        });
    });

    app.get('/prismVolLesson', isLoggedIn, function (req, res) {
        res.render('prismVolLesson.ejs', {
            user: req.user
        });
    });

    //prism stuff

    //sphere stuff 

    app.get('/sphereVolLesson', isLoggedIn, function (req, res) {
        res.render('sphereVolLesson.ejs', {
            user: req.user
        });
    });

    app.get('/sphereSALesson', isLoggedIn, function (req, res) {
        res.render('sphereSALesson.ejs', {
            user: req.user
        });
    });

    app.get('/sphereWorkshop', isLoggedIn, function (req, res) {
        res.render('sphereWorkshop.ejs', {
            user: req.user
        });
    });

    app.get('/sphereExam', isLoggedIn, function (req, res) {
        res.render('sphereExam.ejs', {
            user: req.user
        });
    });

    //sphere stuff

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