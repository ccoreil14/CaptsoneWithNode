var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
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
});

//userSchema.methods.hash = function() {
//  // add some stuff to the users name
//  this.password = this.password+""+Math.random(); 
//
//  return this.password;
//};


var User = mongoose.model('User', userSchema);

module.exports = User;