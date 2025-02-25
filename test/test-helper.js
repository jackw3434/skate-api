let frisby = require('frisby');
let User = require('../models/user');
let SkatePin = require('../models/skatePin');
let { serverPort, mongoose } = require('../database-connection/mongoose-connection');
let baseURL = 'http://localhost:' + serverPort + '/api/';
let auth = require('../utils/auth');
let server = require('../server');
let Grid = require('gridfs-stream');

let deleteAllImages = async function () {

    let gfs;
    
    mongoose.connection.once('open', () => {
        gfs = Grid(mongoose.connection.db, mongoose.mongo);
        gfs.collection('uploads');

        gfs.files.find().toArray(async (err, files) => {
            // check if files exist
            if (!files || files.length === 0) {
                console.log("no files", err);
                return
            }

            for (let index = 0; index < files.length;) {

                let file = files[index];               
             
                await gfs.remove({ _id: file._id, root:'uploads'  }, async (err, gridStore) => {
                    if (err) {
                        return err
                    }
                    await console.log("chunk deleted ", gridStore)
                    return
                })
                index++
            }
            console.log("deleted")
        })
    })
}

let mongooseConnect = async function () {
    server;
};

let prepareUsers = async function () {
    await emptyUsersCollection();
    await populateUsersCollection();
};

let prepareSkatePins = async function () {
    await emptySkatePinsCollection();
    await populateSkatePinsCollection();
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
    prepareSkatePinsCollection: prepareSkatePins,
    prepareUsersCollection: prepareUsers,
    deleteAllImages: deleteAllImages,
    init: mongooseConnect
};

module.exports = testHelper;

let emptySkatePinsCollection = async function () {
    await SkatePin.deleteMany().exec();
}


let populateSkatePinsCollection = async function () {

    // PLYMOUTH LOCATIONS

    // let hereToTeachSkatePin = new SkatePin({
    //     _id: new mongoose.Types.ObjectId("ab7cbcf7e435a1253b6f8dbe"),
    //     title: "Here To Teach",
    //     createdBy: {
    //         _id: "06a9fab994a0eef9618e9d58",
    //         userName: "Skater Admin Andy",
    //     },
    //     coordinate: {
    //         latitude: 50.385512,
    //         longitude: -4.154243
    //     },
    //     description: "Here at the park teaching flip tricks",
    //     photo: "",
    //     reviews: [
    //         // { // will be populate with reviews from the createdBy skater
    //         //     reviewerID: "06a9fab994a0eef9618e9d58",
    //         //     reviewerName: "Admin Skater Jack",
    //         //     reviewMessage: "Here To Teach Really helped me learn and explained things well."
    //         // },
    //         // {
    //         //     reviewerID: "8c835ce289db541d3cdc4183",
    //         //     reviewerName: "John",
    //         //     reviewMessage: "Here To Teach Cool guy to skate with, really friendly."
    //         // }
    //     ],
    //     skateDate: "4/27/2020",
    //     startTime: "11:00:00 AM",
    //     endTime: "13:00:00 PM",
    //     pinColor: "orange"
    // });

    // await hereToTeachSkatePin.save();

    // let gameOfSkatePin = new SkatePin({
    //     _id: new mongoose.Types.ObjectId("678671a7ab77bfd1589bb4d7"),
    //     title: "Game of S.K.A.T.E",
    //     createdBy: {
    //         _id: "06a9fab994a0eef9618e9d58",
    //         userName: "Skater Admin Andy",
    //     },
    //     coordinate: {
    //         latitude: 50.385272,
    //         longitude: -4.154546
    //     },
    //     description: "Game of skate anyone?",
    //     photo: "",
    //     reviews: [
    //         // { // will be populate with reviews from the createdBy skater
    //         //     reviewerID: "06a9fab994a0eef9618e9d58",
    //         //     reviewerName: "Admin Skater Jack",
    //         //     reviewMessage: "Game of S.K.A.T.E Really helped me learn and explained things well."
    //         // },
    //         // {
    //         //     reviewerID: "8c835ce289db541d3cdc4183",
    //         //     reviewerName: "John",
    //         //     reviewMessage: "Game of S.K.A.T.E Cool guy to skate with, really friendly."
    //         // }
    //     ],
    //     skateDate: "4/27/2020",
    //     startTime: "13:00:00 AM",
    //     endTime: "13:30:00 PM",
    //     pinColor: "red"
    // });

    // await gameOfSkatePin.save();

    let skateSpotPin = new SkatePin({
        _id: new mongoose.Types.ObjectId("b9792b9c25d5b739b6de2087"),
        title: "Skate spot",
        createdBy: {
            _id: "06a9fab994a0eef9618e9d58",
            userName: "Skater Admin Andy",
        },
        coordinate: {
            latitude: 50.385409,
            longitude: -4.154491
        },
        description: ["Plymouth Central Park Skate Park: Flat banks, quater pipes, bowl, snake run, half pipe"],
        photo: "No Picture Yet",

        reviews: [
            {
                reviewerID: "06a9fab994a0eef9618e9d58",
                reviewerName: "Admin Skater Jack",
                reviewMessage: "Skate spot This is a cool place to skate"
            },
            {
                reviewerID: "8c835ce289db541d3cdc4183",
                reviewerName: "John",
                reviewMessage: "Skate spot Lots of friendly people around to skate, its quiet in the mornings."
            }
        ],
        pinColor: "blue"
    });

    await skateSpotPin.save();

    // // TAUNTON LOCATIONS

    // let tauntonHereToTeachSkatePin = new SkatePin({
    //     _id: new mongoose.Types.ObjectId("fb7fe2f40369575c1f811c1d"),
    //     title: "Here To Teach",
    //     createdBy: {
    //         _id: "06a9fab994a0eef9618e9d58",
    //         userName: "Skater Admin Andy",
    //     },
    //     coordinate: {
    //         latitude: 50.385512,
    //         longitude: -4.154243
    //     },
    //     description: "Here at the park teaching flip tricks",
    //     //  photo: "",
    //     reviews: [
    //         // { // will be populate with reviews from the createdBy skater
    //         //     reviewerID: "06a9fab994a0eef9618e9d58",
    //         //     reviewerName: "Admin Skater Jack",
    //         //     reviewMessage: "Here To Teach Really helped me learn and explained things well."
    //         // },
    //         // {
    //         //     reviewerID: "8c835ce289db541d3cdc4183",
    //         //     reviewerName: "John",
    //         //     reviewMessage: "Here To Teach Cool guy to skate with, really friendly."
    //         // }
    //     ],
    //     skateDate: "4/27/2020",
    //     startTime: "11:00:00 AM",
    //     endTime: "13:00:00 PM",
    //     pinColor: "orange"
    // });

    // await tauntonHereToTeachSkatePin.save();

    // let tauntonGameOfSkatePin = new SkatePin({
    //     _id: new mongoose.Types.ObjectId("844fa02271caee4e4048e1ee"),
    //     title: "Game of S.K.A.T.E",
    //     createdBy: {
    //         _id: "06a9fab994a0eef9618e9d58",
    //         userName: "Skater Admin Andy",
    //     },
    //     coordinate: {
    //         latitude: 50.385272,
    //         longitude: -4.154546
    //     },
    //     description: "game of skate",
    //     photo: "",
    //     reviews: [
    //         // { // will be populate with reviews from the createdBy skater
    //         //     reviewerID: "06a9fab994a0eef9618e9d58",
    //         //     reviewerName: "Admin Skater Jack",
    //         //     reviewMessage: "Game of S.K.A.T.E Really helped me learn and explained things well."
    //         // },
    //         // {
    //         //     reviewerID: "8c835ce289db541d3cdc4183",
    //         //     reviewerName: "John",
    //         //     reviewMessage: "Game of S.K.A.T.E Cool guy to skate with, really friendly."
    //         // }
    //     ],
    //     skateDate: "4/27/2020",
    //     startTime: "13:00:00 AM",
    //     endTime: "13:30:00 PM",
    //     pinColor: "red"
    // });

    // await tauntonGameOfSkatePin.save();

    // let tauntonStapleGroveSkateSpotPin = new SkatePin({
    //     _id: new mongoose.Types.ObjectId("9ee7ba96ba3be4199eaa1338"),
    //     title: "Skate spot",
    //     createdBy: {
    //         _id: "06a9fab994a0eef9618e9d58",
    //         userName: "Skater Admin Andy",
    //     },
    //     coordinate: {
    //         latitude: 51.028835,
    //         longitude: -3.125843
    //     },
    //     description: "Taunton, Staplegrove ramps: half pipe, mini ramp",
    //     photo: "",
    //     reviews: [{ // will be populate with reviews for this spot
    //         reviewerID: "06a9fab994a0eef9618e9d58",
    //         reviewerName: "Admin Skater Jack",
    //         reviewMessage: "Skate spot This is a cool place to skate"
    //     },
    //     {
    //         reviewerID: "8c835ce289db541d3cdc4183",
    //         reviewerName: "John",
    //         reviewMessage: "Skate spot Lots of friendly people around to skate, its quiet in the mornings."
    //     }],
    //     pinColor: "blue"
    // });

    // await tauntonStapleGroveSkateSpotPin.save();

    // let tauntonHamiltonSkateSpotPin = new SkatePin({
    //     _id: new mongoose.Types.ObjectId("2416847178c1f3b78ad61218"),
    //     title: "Skate spot",
    //     createdBy: {
    //         _id: "06a9fab994a0eef9618e9d58",
    //         userName: "Skater Admin Andy",
    //     },
    //     coordinate: {
    //         latitude: 51.017004,
    //         longitude: -3.079345
    //     },
    //     description: "Taunton, Hamilton skate park: Street style, quater pipes, bowl, snake run, smooth quick dry concrete",
    //     photo: "",
    //     reviews: [{ // will be populate with reviews for this spot
    //         reviewerID: "06a9fab994a0eef9618e9d58",
    //         reviewerName: "Admin Skater Jack",
    //         reviewMessage: "Skate spot This is a cool place to skate"
    //     },
    //     {
    //         reviewerID: "8c835ce289db541d3cdc4183",
    //         reviewerName: "John",
    //         reviewMessage: "Skate spot Lots of friendly people around to skate, its quiet in the mornings."
    //     }],
    //     pinColor: "blue"
    // });

    // await tauntonHamiltonSkateSpotPin.save();

    // let tauntonHamiltonHereToTeachSkatePin = new SkatePin({
    //     _id: new mongoose.Types.ObjectId("b96a46d91704d15ac8c0493d"),
    //     title: "Here To Teach",
    //     createdBy: {
    //         _id: "06a9fab994a0eef9618e9d58",
    //         userName: "Skater Admin Andy",
    //     },
    //     coordinate: {
    //         latitude: 51.017187,
    //         longitude: -3.079465
    //     },
    //     description: "Here at the park teaching flip tricks",
    //     photo: "",
    //     reviews: [
    //         // { // will be populate with reviews from the createdBy skater
    //         //     reviewerID: "06a9fab994a0eef9618e9d58",
    //         //     reviewerName: "Admin Skater Jack",
    //         //     reviewMessage: "Here To Teach Really helped me learn and explained things well."
    //         // },
    //         // {
    //         //     reviewerID: "8c835ce289db541d3cdc4183",
    //         //     reviewerName: "John",
    //         //     reviewMessage: "Here To Teach Cool guy to skate with, really friendly."
    //         // }
    //     ],
    //     skateDate: "4/27/2020",
    //     startTime: "11:00:00 AM",
    //     endTime: "13:00:00 PM",
    //     pinColor: "orange"
    // });

    // await tauntonHamiltonHereToTeachSkatePin.save();
}

let emptyUsersCollection = async function () {
    await User.deleteMany().exec();
};

let populateUsersCollection = async function () {

    let user = new User({
        _id: new mongoose.Types.ObjectId("06a9fab994a0eef9618e9d58"),
        profilePicture: "",
        name: "Admin Skater Andy",
        email: "andy.test@gmail.com",
        age: "25-30",
        //   region:"England",
        skateStance: "Regular",
        // styleOfSkating:["Street","Ramps","Old school"],
        // reasonsForUsingTheApp:["Meet others who skate","Teach others to skate"],
        achievedTricks: ["Ollie", "Kickflip", "Heelflip"],
        usersCreatedPins: [],
        password: auth.hashPassword("test123"),
        role: "superAdmin",
        reviews: [
            // { // will be populate with reviews from the createdBy skater
            //     reviewerID: "06a9fab994a0eef9618e9d58",
            //     reviewerName: "Admin Skater Jack",
            //     reviewMessage: "Really helped me learn and explained things well."
            // },
            // {
            //     reviewerID: "8c835ce289db541d3cdc4183",
            //     reviewerName: "John",
            //     reviewMessage: "Cool guy to skate with, really friendly."
            // }
        ]
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

    let user4 = new User({
        _id: new mongoose.Types.ObjectId("5b2dbfee39ea482350b7172b"),
        profilePicture: "",
        name: "Admin Skater Jack",
        email: "jack.test@gmail.com",
        age: "25-30",
        //   region:"England",
        skateStance: "Regular",
        // styleOfSkating:["Street","Ramps","Old school"],
        // reasonsForUsingTheApp:["Meet others who skate","Teach others to skate"],
        achievedTricks: ["Ollie", "Kickflip", "Heelflip"],
        usersCreatedPins: [],
        password: auth.hashPassword("test123"),
        role: "superAdmin",
        reviews: [
            // { // will be populate with reviews from the createdBy skater
            //     reviewerID: "06a9fab994a0eef9618e9d58",
            //     reviewerName: "Admin Skater Jack",
            //     reviewMessage: "Really helped me learn and explained things well."
            // },
            // {
            //     reviewerID: "8c835ce289db541d3cdc4183",
            //     reviewerName: "John",
            //     reviewMessage: "Cool guy to skate with, really friendly."
            // }
        ]
    });

    await user4.save();

    console.log("Populated");
};