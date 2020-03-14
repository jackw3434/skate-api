let frisby = require('frisby');
let User = require('../models/user');
let { serverPort, mongoose } = require('../database-connection/mongoose-connection');
let baseURL = 'http://localhost:' + serverPort + '/api/';
let auth = require('../utils/auth');
let server = require('../server');

let mongooseConnect = async function () {
    server;
};

let prepareUsers = async function () {
    await emptyUsersCollection();
    await populateUsersCollection();
};

let testHelper = {
    loginsuperAdmin:
        async function () {
            return frisby.post(baseURL + "login", {
                "email": "jack.test@gmail.com",
                "password": "test123"
            }, {
                    json: true
                })
                .then(function (res) {
                    console.log("skfhsfkjhdfkj  ", res)
                    token = res._json.accessToken;
                    frisby.globalSetup({
                        request: {
                            headers: {
                                'Authorization': token,
                                'Content-Type': 'application/json',
                            }
                        }
                    });
                })
        },
    prepareUsersCollection: prepareUsers,
    init: mongooseConnect
};

module.exports = testHelper;

let emptyUsersCollection = async function () {
    await User.deleteMany().exec();
};

let populateUsersCollection = async function () {

    let user = new User({
        _id: new mongoose.Types.ObjectId("06a9fab994a0eef9618e9d58"),
        name: "Jack",
        email: "jack.test@gmail.com",
        password: auth.hashPassword("test123"),
        role: "superAdmin"
    });

    await user.save();

    let user2 = new User({
        _id: new mongoose.Types.ObjectId("8c835ce289db541d3cdc4183"),
        name: "John",
        email: "john.test@gmail.com",
        password: auth.hashPassword("test123"),
        role: "superAdmin"
    });

    await user2.save();

    let user3 = new User({
        _id: new mongoose.Types.ObjectId("64706e408463696b3232a513"),
        name: "James",
        email: "james.test@gmail.com",
        password: auth.hashPassword("test123"),
        role: "superAdmin"
    });

    await user3.save();

    console.log("Populated");
};