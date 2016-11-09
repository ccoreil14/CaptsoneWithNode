var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;


var userSchema = new Schema({
    local: {
        email: String,
        password: {
            type: String,
            required: true
        },
        isTeacher: {
            type: Boolean,
            required: true
        },
        profilePic: {
            type: String
        },
        profileBio: {
            type: String
        },
        profileColor: {
            type: String
        },
        userExams: {
            rectExam: {
                type: Number
            },
            circExam: {
                type: Number
            },
            prismExam: {
                type: Number
            },
            sphereExam: {
                type: Number
            }
        },
        userMedals: {
            medal1: {
                type: Boolean
            },
            medal2: {
                type: Boolean
            },
            medal3: {
                type: Boolean
            },
            medal4: {
                type: Boolean
            },
            medal5: {
                type: Boolean
            },
            medal6: {
                type: Boolean
            },
            medal7: {
                type: Boolean
            },
            medal8: {
                type: Boolean
            }
        },
        userConnections: [String]
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;