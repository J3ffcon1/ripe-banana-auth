const { assert } = require('chai');
const User = require('../../lib/models/User');

describe('User model', () => {

    const data = {
        email: 'me@me.com'
    };

    const password = 'abc';

    it('generates hash from password', () =>{
        const user = new User(data);
        user.generateHash(password); //generates a hash using the password.
        assert.ok(user.hash);
        assert.notEqual(user.hash, password); //this is saying that the hash should not be the same as the password. 


    });


});