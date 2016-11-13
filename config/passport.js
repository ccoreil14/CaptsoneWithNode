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
                        newUser.local.username = req.param('username');
                        newUser.local.isTeacher = req.param('isTeacher');
                        newUser.local.profilePic = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
                        newUser.local.profileBio = "Default Bio";
                        newUser.local.profileColor = "8092DE";
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
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

        
//        var examQuestions = [["circExam", "../images/ExamQuestions/circle1.png", 12.56, "Find the area of a circle with a radius of 2, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle2.png", 18.84, "Find the circumfrence of a circle with a radius of 3, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle3.png", 50.24, "Find the area of a circle with a radius of 4, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle4.png", 31.4, "Find the circumfrence of a circle with a radius of 5, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle5.png", 314, "Find the area of a circle with a radius of 10, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle6.png", 628, "Find the circumfrence of a circle with a radius of 100, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle7.png", 7850, "Find the area of a circle with a radius of 50, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle8.png", 125.6, "Find the circumfrence of a circle with a radius of 20, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle9.png", 706.5,"Find the area of a circle with a radius of 15, use 3.14 for pi."],["circExam", "../images/ExamQuestions/circle10.png", 50.24, "Find the circumfrence of a circle with a radius of 8, use 3.14 for pi."],["rectExam", "../images/ExamQuestions/perimeter2.png", 17, "Find the perimeter of this shape."],["rectExam", "../images/ExamQuestions/perimeter5.png", 30, "Find the perimeter of this rectangle with a length of 10 and a width of 5."],["rectExam", "../images/ExamQuestions/perimeter6.png", 16, "Find the perimeter of this square with a side length of 4."],["rectExam", "../images/ExamQuestions/perimeter8.png", 8, "Find the perimeter of this triangle."],["rectExam", "../images/ExamQuestions/perimeter10.png", 24, "Find the perimeter of this dodecagon, a shape with tweleve sides."],["rectExam", "../images/ExamQuestions/rectArea2.png", 32, "Find the Area of this rectangle. It has a width of 4 and a length of 8."],["rectExam", "../images/ExamQuestions/rectArea5.png", 27, "Find the Area of this rectangle. It has a width of 3 and a length of 9."],["rectExam", "../images/ExamQuestions/rectArea8.png", 49, "Find the Area of this square. It has a side length 7."],["rectExam", "../images/ExamQuestions/rectArea9.png", 2, "Find the Area of this rectangle."],["rectExam", "../images/ExamQuestions/rectArea10.png", 8, "Find the Area of this rectangle. It has a width of 2 and a length of 4."],        ["prismExam", "../images/ExamQuestions/prism1.png", 96, "Find the Surface Area of this cube. It has a side length of 4."],        ["prismExam", "../images/ExamQuestions/prism2.png", 125, "Find the Volume of this cube. It has a side length of 5."],        ["prismExam", "../images/ExamQuestions/prism3.png", 158, "Find the Surface Area of this prism. Length: 8, Width: 3, Height 5."],        ["prismExam", "../images/ExamQuestions/prism4.png", 120, "Find the Volume of this prism. Length: 10, Width: 2, Height 6."],        ["prismExam", "../images/ExamQuestions/prism5.png", 182, "Find the Surface Area of this prism. Length: 7, Width: 3, Height 7."],        ["prismExam", "../images/ExamQuestions/prism6.png", 48, "Find the Volume of this prism. Length: 4, Width: 2, Height 6."],        ["prismExam", "../images/ExamQuestions/prism7.png", 94, "Find the Surface Area of this prism. Length: 5, Width: 1, Height 7."],        ["prismExam", "../images/ExamQuestions/prism8.png", 24, "Find the Volume of this prism. Length: 4, Width: 1, Height 6."],        ["prismExam", "../images/ExamQuestions/prism9.png", 190, "Find the Surface Area of this prism. Length: 5, Width: 3, Height 10."],        ["prismExam", "../images/ExamQuestions/prism10.png", 84, "Find the Volume of this prism. Length: 6, Width: 2, Height 7."],        ["sphereExam", "../images/ExamQuestions/sphere1.png", 113.04, "Find the Surface Area of this sphere with a radius of 3, use 3.14 for pi."],        ["sphereExam", "../images/ExamQuestions/sphere2.png", 523.33, "Find the Volume of this sphere with a radius of 5, use 3.14 for pi and round to the hundreds place."],        ["sphereExam", "../images/ExamQuestions/sphere3.png", 50.24, "Find the Surface Area of this sphere with a radius of 2, use 3.14 for pi and round to the hundreds place."],        ["sphereExam", "../images/ExamQuestions/sphere4.png", 904.32, "Find the Volume of this sphere with a radius of 6, use 3.14 for pi and round to the hundreds place"],        ["sphereExam", "../images/ExamQuestions/sphere5.png", 803.84, "Find the Surface Area of this sphere with a radius of 8, use 3.14 for pi and round to the hundreds place."],        ["sphereExam", "../images/ExamQuestions/sphere6.png", 4186.67, "Find the Volume of this sphere with a radius of 10, use 3.14 for pi and round to the hundreds place."],        ["sphereExam", "../images/ExamQuestions/sphere8.png", 1256, "Find the Surface Area of this sphere with a radius of 10, use 3.14 for pi and round to the hundreds place"],        ["sphereExam", "../images/ExamQuestions/sphere7.png",  1436.03, "Find the Volume of this sphere with a radius of 7, use 3.14 for pi and round to the hundreds place."],        ["sphereExam", "../images/ExamQuestions/sphere4.png", 452.16, "Find the Surface Area of this sphere with a radius of 6, use 3.14 for pi and round to the hundreds place"],        ["sphereExam", "../images/ExamQuestions/sphere10.png", 14130, "Find the Volume of this sphere with a radius of 15, use 3.14 for pi and round to the hundreds place."]];
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
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 

                // all is well, return successful user
                return done(null, user);
            });

        }));

};