/////////////////
//////ROUTING////
/////////////////
var User = require('./models/user');
var ExamQuestion = require('./models/examQuestion');

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


    app.get('/home', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('index.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('index.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('teacherProfilePage.ejs', {
                    user: req.user,
                    studentArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, mainTeachers) {
                User.find({
                    'local.isTeacher': true
                }, function (err, teachers) {
                    res.render('studentProfilePage.ejs', {
                        user: req.user,
                        userTeachers: mainTeachers,
                        teacherArray: teachers
                    });
                });
            });




        }
    });

    app.post('/changeTeacher', function (req, res) {
        User.findOne({
            'local.email': req.user.local.email

        }, function (err, user) {
            req.user.local.userConnections = [req.body.teacher];
            req.user.save();
            res.redirect('/profile');
        });
    });

    app.post('/profile', function (req, res) {
        User.findOne({
            local: {
                email: req.user.local.email
            }
        }, function (err, user) {
            req.user.local.email = req.body.newEmail;
            if (req.body.newPassword.length > 0) {
                req.user.local.password = req.user.generateHash(req.body.newPassword);
            }
            req.user.local.username = req.body.newUsername;
            req.user.local.profilePic = req.body.newPic;
            req.user.local.profileBio = req.body.newBio;
            req.user.local.profileColor = req.body.newColor;
            req.user.save();
            res.redirect('/profile');
            if (err) throw err;
        });

    });

    app.get('/shapelist', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('shapeListPage.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('shapeListPage.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    //circle stuff

    app.get('/circAreaLesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('circAreaLesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('circAreaLesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    app.get('/circExam', isLoggedIn, function (req, res) {
        ExamQuestion.find({
            examName: "circExam"
        }, function (err, examQuestions) {
            examQuestionArray = examQuestions;
            shuffle(examQuestionArray);
            res.render('circExam.ejs', {
                user: req.user,
                examQuestions: examQuestionArray
            });
        });
    });

    app.post('/circExam', isLoggedIn, function (req, res) {
        User.findOne({
            local: {
                email: req.user.local.email
            }
        }, function (err, user) {
            req.user.local.userExams.circExam = req.body.finalScore;
            req.user.save();
            res.redirect('/profile');
            if (err) throw err;
        });

    });

    app.get('/circleWorkshop', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('circleWorkshop.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('circleWorkshop.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }

    });

    app.get('/circumfrenceLesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('circumfrenceLesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('circumfrenceLesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });
    //circle stuff


    //square stuff

    app.get('/perimeterLesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('perimeterLesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('perimeterLesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    app.get('/rectAreaLesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('rectAreaLesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('rectAreaLesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    var examQuestionArray = [];
    app.get('/squareExam', isLoggedIn, function (req, res) {
        ExamQuestion.find({
            examName: "rectExam"
        }, function (err, examQuestions) {
            examQuestionArray = examQuestions;
            shuffle(examQuestionArray);
            res.render('squareExam.ejs', {
                user: req.user,
                examQuestions: examQuestionArray
            });
        });
    });

    app.post('/squareExam', isLoggedIn, function (req, res) {
        User.findOne({
            local: {
                email: req.user.local.email
            }
        }, function (err, user) {
            req.user.local.userExams.rectExam = req.body.finalScore;
            req.user.save();
            res.redirect('/profile');
            if (err) throw err;
        });

    });

    app.get('/squareWorkshop', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('squareWorkshop.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('squareWorkshop.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    //square stuff


    //prism stuff

    app.get('/cubeWorkshop', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('cubeWorkshop.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('cubeWorkshop.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    app.get('/prismExam', isLoggedIn, function (req, res) {
        ExamQuestion.find({
            examName: "prismExam"
        }, function (err, examQuestions) {
            examQuestionArray = examQuestions;
            shuffle(examQuestionArray);
            res.render('prismExam.ejs', {
                user: req.user,
                examQuestions: examQuestionArray
            });
        });
    });

    app.post('/prismExam', isLoggedIn, function (req, res) {
        User.findOne({
            local: {
                email: req.user.local.email
            }
        }, function (err, user) {
            req.user.local.userExams.prismExam = req.body.finalScore;
            req.user.save();
            res.redirect('/profile');
            if (err) throw err;
        });

    });

    app.get('/prismSALesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('prismSALesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('prismSALesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    app.get('/prismVolLesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('prismVolLesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('prismVolLesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    //prism stuff

    //sphere stuff 

    app.get('/sphereVolLesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('sphereVolLesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('sphereVolLesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }

    });

    app.get('/sphereSALesson', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('sphereSALesson.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('sphereSALesson.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    app.get('/sphereWorkshop', isLoggedIn, function (req, res) {
        if (req.user.local.isTeacher === true) {
            User.find({
                'local.userConnections': req.user.local.email
            }, function (err, students) {
                res.render('sphereWorkshop.ejs', {
                    user: req.user,
                    peopleArray: students
                });
            });
        } else {
            User.find({
                'local.email': req.user.local.userConnections[0]
            }, function (err, teachers) {
                res.render('sphereWorkshop.ejs', {
                    user: req.user,
                    peopleArray: teachers
                });
            });
        }
    });

    app.get('/sphereExam', isLoggedIn, function (req, res) {
        ExamQuestion.find({
            examName: "sphereExam"
        }, function (err, examQuestions) {
            examQuestionArray = examQuestions;
            shuffle(examQuestionArray);
            res.render('sphereExam.ejs', {
                user: req.user,
                examQuestions: examQuestionArray
            });
        });
    });

    app.post('/sphereExam', isLoggedIn, function (req, res) {
        User.findOne({
            local: {
                email: req.user.local.email
            }
        }, function (err, user) {
            req.user.local.userExams.sphereExam = req.body.finalScore;
            req.user.save();
            res.redirect('/profile');
            if (err) throw err;
        });

    });


    //sphere stuff

    //mock pages

    app.get('/mockCirc', function (req, res) {
        res.render('mockCircWorkshop.ejs');
    });

    app.get('/mockCube', function (req, res) {
        res.render('mockCubeWorkshop.ejs');
    });

    app.get('/mockRect', function (req, res) {
        res.render('mockRectWorkshop.ejs');
    });

    app.get('/mockSphere', function (req, res) {
        res.render('mockSphereWorkshop.ejs');
    });


    //mock pages


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

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}