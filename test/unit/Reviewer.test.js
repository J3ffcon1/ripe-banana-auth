const { assert } = require('chai');
const Reviewer = require('../../lib/models/Reviewer');
const { getErrors } = require('./helpers');

describe('Reviewer Unit Test', () => {

    it('this Reviewer model has got it going on', () => {
        const input = {
            name: 'Desson Howe',
            company: 'Washington Post'
        };

        const reviewer = new Reviewer(input);
        input._id = reviewer._id;
        assert.deepEqual(reviewer.toJSON(), input);
        assert.isUndefined(reviewer.validateSync());
    });

    it('if required field is empty throws error', () => {
        const reviewer = new Reviewer({});
        const errors = getErrors(reviewer.validateSync(), 2);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.company.kind, 'required');
    });


});