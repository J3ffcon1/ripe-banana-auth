const { assert } = require('chai');
const User = require('../../lib/models/User');

describe.only('User model', () => {

    const data = {
        email: 'me@me.com'
    };

    const password = 'abc';

    it('generates hash from password', () =>{ //is this an actual token generated.
        const user = new User(data);
        user.generateHash(password); //generates a hash using the password.
        assert.ok(user.hash); //hash is a generated string of random characters. hashing is the act of converting those passwords to unreadable strings.
        assert.notEqual(user.hash, password); //this is saying that the hash should not be the same as the password. 


    });


});