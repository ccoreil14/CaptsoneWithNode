// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../Public/models/user');
var ExamQuestion = require('../Public/models/examQuestion');


// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({
                    'local.email': email
                }, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUser = new User();


                        // set the user's local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.isTeacher = req.param('isTeacher');
                        newUser.local.profilePic = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
                        newUser.local.profileBio = "Default Bio";
                        newUser.local.profileColor = "#000000";
                        newUser.local.userExams.circExam = -1;
                        newUser.local.userExams.rectExam = -1;
                        newUser.local.userExams.prismExam = -1;
                        newUser.local.userExams.sphereExam = -1;
                        newUser.local.userMedals.medal1 = false;
                        newUser.local.userMedals.medal2 = false;
                        newUser.local.userMedals.medal3 = false;
                        newUser.local.userMedals.medal4 = false;
                        newUser.local.userMedals.medal5 = false;
                        newUser.local.userMedals.medal6 = false;
                        newUser.local.userMedals.medal7 = false;
                        newUser.local.userMedals.medal8 = false;
                        newUser.local.userConnections = [];

                        // save the user
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });


                    }

                });




            });
            
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

        
//        var examQuestions = [["circExam", "../images/ExamQuestions/circle1.png", 12.57, "Area 2"],["circExam", "../images/ExamQuestions/circle2.png", 18.85, "Circumfrence 3"],["circExam", "../images/ExamQuestions/circle3.png", 50.27, "Area 4"],["circExam", "../images/ExamQuestions/circle4.png", 31.42, "Circumfrence 5"],["circExam", "../images/ExamQuestions/circle5.png", 314.16, "Area 10"],["circExam", "../images/ExamQuestions/circle6.png", 628.32, "Circumfrence 100"],["circExam", "../images/ExamQuestions/circle7.png", 7853.98, "Area 50"],["circExam", "../images/ExamQuestions/circle8.png", 125.66, "Circumfrence 20"],["circExam", "../images/ExamQuestions/circle9.png", 706.86,"Area 15"],["circExam", "../images/ExamQuestions/circle10.png", 50.27, "Circumfrence 8"],["rectExam", "../images/ExamQuestions/perimeter2.png", 17, "Perimeter"],["rectExam", "../images/ExamQuestions/perimeter5.png", 30, "Perimeter"],["rectExam", "../images/ExamQuestions/perimeter6.png", 16, "Perimeter"],["rectExam", "../images/ExamQuestions/perimeter8.png", 8, "Perimeter"],["rectExam", "../images/ExamQuestions/perimeter10.png", 24, "Perimeter"],["rectExam", "../images/ExamQuestions/rectArea2.png", 32, "Rect Area"],["rectExam", "../images/ExamQuestions/rectArea5.png", 27, "Rect Area"],["rectExam", "../images/ExamQuestions/rectArea8.png", 49, "Rect Area"],["rectExam", "../images/ExamQuestions/rectArea9.png", 2, "Rect Area"],["rectExam", "../images/ExamQuestions/rectArea10.png", 8, "Rect Area"],        ["prismExam", "../images/ExamQuestions/prism1.png", 96, "SA"],        ["prismExam", "../images/ExamQuestions/prism2.png", 125, "Vol"],        ["prismExam", "../images/ExamQuestions/prism3.png", 158, "SA"],        ["prismExam", "../images/ExamQuestions/prism4.png", 120, "Vol"],        ["prismExam", "../images/ExamQuestions/prism5.png", 182, "SA"],        ["prismExam", "../images/ExamQuestions/prism6.png", 48, "Vol"],        ["prismExam", "../images/ExamQuestions/prism7.png", 94, "SA"],        ["prismExam", "../images/ExamQuestions/prism8.png", 24, "Vol"],        ["prismExam", "../images/ExamQuestions/prism9.png", 190, "SA"],        ["prismExam", "../images/ExamQuestions/prism10.png", 84, "Vol"],        ["sphereExam", "../images/ExamQuestions/sphere1.png", 113.1, "SA"],        ["sphereExam", "../images/ExamQuestions/sphere2.png", 523.6, "Vol"],        ["sphereExam", "../images/ExamQuestions/sphere3.png", 50.27, "SA"],        ["sphereExam", "../images/ExamQuestions/sphere4.png", 904.78, "Vol"],        ["sphereExam", "../images/ExamQuestions/sphere5.png", 804.25, "SA"],        ["sphereExam", "../images/ExamQuestions/sphere6.png", 4188.79, "Vol"],        ["sphereExam", "../images/ExamQuestions/sphere8.png", 1256.64, "SA"],        ["sphereExam", "../images/ExamQuestions/sphere7.png", 1436.76, "Vol"],        ["sphereExam", "../images/ExamQuestions/sphere4.png", 452.39, "SA"],        ["sphereExam", "../images/ExamQuestions/sphere10.png", 14137.17, "Vol"]];
//
//            for (i = 0; i < examQuestions.length; i++) {
//            var newQuestion = new ExamQuestion();
//                newQuestion.examName = examQuestions[i][0];
//                newQuestion.picRoute = examQuestions[i][1];
//                newQuestion.answer = examQuestions[i][2];
//                newQuestion.description = examQuestions[i][3];
//                newQuestion.save();
//                console.log(examQuestions[i][0]);
//            }
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                'local.email': email
            }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));

};