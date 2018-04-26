const { assert } = require('chai');
const User = require('../../lib/models/User');

describe.only('User model', () => {

    const data = {
        email: 'me@me.com'
    };

    const password = 'abc';

    it('generates hash from password', () =>{ //is this an actual token generated.
        const user = new User(data);
        user.generateHash(password); //generates a hash using the password. (using bcrypt in our model.)
        assert.ok(user.hash); //hash is a generated string of random characters. hashing is the act of converting those passwords to unreadable strings.
        assert.notEqual(user.hash, password); //this is saying that the hash should not be the same as the password. 


    });

    it('compares password to hash', () => {
        const user = new User(data); //creating another instance of our user model.
        user.generateHash(password);
        assert.isOk(user.comparePassword(password)); //compare this user password to a hash value. (we want to check if this password is the same as the hash).


    });


});