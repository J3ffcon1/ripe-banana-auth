const router = require('express').Router();
const Reviewer = require('../models/Reviewer');
const Review = require('../models/Review');
const { updateOptions } = require('../util/mongoose-helpers');

const check404 = (actor, id) => {
    if(!actor) {
        throw {
            status: 404,
            error: `No reviewer by id ${id}`
        };
    }
};

module.exports = router
    .post('/', (req, res, next) => {
        Reviewer.create(req.body)
            .then(reviewer => res.json(reviewer))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        const { id } = req.params;

        Promise.all([
            Reviewer.findById(id)
                .lean(),
                
            Review.find({ 'reviewer': id })
                .lean()
                .select('_id rating review')
                .populate({
                    path: 'film',
                    select: '_id title'
                })
        ])
            .then(([reviewer, reviews]) => {
                check404(reviewer, id);
                reviewer.reviews = reviews;
                res.json(reviewer);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Reviewer.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('_id name')
            .then(reviewer => res.json(reviewer))
            .catch(next);
    })
    .put('/:id', (req, res, next) => {
        Reviewer.findByIdAndUpdate(req.params.id, req.body, updateOptions)
            .then(reviewer => res.json(reviewer))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Reviewer.findByIdAndRemove(req.params.id)
            .then(removed => res.json(removed))
            .catch(next);
    });