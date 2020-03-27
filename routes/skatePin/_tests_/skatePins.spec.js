const frisby = require('frisby');
let port = require('../../../database-connection/mongoose-connection').serverPort;
let baseURL = 'http://localhost:' + port + '/api/';
let testHelper = require('../../../test/test-helper');

describe('skate pin tests', function () {

    beforeAll(async (done) => {
        await testHelper.init();
        await testHelper.prepareSkatePinsCollection();
        await testHelper.loginsuperAdmin();
        return done();
    });

    describe('skatePins.get test', function () {
        it('GET should return a status of 200 OK', function () {
            return frisby
                .get(baseURL + 'skatePins')
                .then(function (res) {
                    console.log(res._json)
                    expect(res.status).toBe(200);
                })
        });
    });  

    // describe('skatePin.post test', function () {
    //     it('should POST a new skate pin and return a status of 200 OK', function () {
    //         return frisby
    //             .post(baseURL + 'skatePin', {
               
    //             })
    //             .then(function (res) {
    //                 expect(res.status).toBe(200);
    //                 expect(res._json).toBe('Skate Pin has been created.');
    //             })
    //     });

    //     it('should not POST a skate pin with missing credentials and should return a status of 400 BAD REQUEST', function () {
    //         return frisby
    //             .post(baseURL + 'skatePin', {
                   
    //             })
    //             .then(function (res) {
    //                 expect(res.status).toBe(400);
    //                 expect(res._body).toBe('validation_error, credentials are required.');
    //             })
    //     });
    // })
   
    // describe('skatePin.delete tests', function () {
    //     it('should DELETE a skate pin and return a status of 200 OK', function () {
    //         return frisby
    //             .del(baseURL + 'users/8c835ce289db541d3cdc4183')
    //             .then(function (res) {
    //                 expect(res.status).toBe(200);
    //                 expect(res._json).toBe('User 8c835ce289db541d3cdc4183 has been deleted.');
    //             })
    //     });
      
    // })
})