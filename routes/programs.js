// All routes related to programs

const express = require('express');

// Router gives lets us create views with the same
// functionality as app.get()
const router = express.Router()

// import program model
const ProgramModel = require('./../models/program')

// endpoint to get all programs from the API
router.get('/', (req, res, next) => {
    console.log('currently in /programs')
    // Get all collection data using the mongoose schema
    ProgramModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// endpoint for retrieving a program by programID
router.get('/:id', (req, res, next) => {
    console.log(`Getting program with programID: ${req.params.id}`)

    ProgramModel.findOne({ programID: req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else if (data === null) {
            res.status(404).send('Program not found')
        } else {
            res.json(data)
        }
    })
})

// endpoint to delete a program by programID
router.delete('/:id', (req, res, next) => {
    console.log(`Deleting program with programID: ${req.params.id}`)
    ProgramModel.findOneAndRemove({ programID: req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// endpoint to create a program document
router.post('/', (req, res, next) => {
    ProgramModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.send('Program is added to the database')
            console.log(data)
        }
    })
})

// endpoint for updating (editing) a program
router.put('/:id', (req, res, next) => {
    ProgramModel.findOneAndUpdate({ programID: req.params.id }, {$set: req.body}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.send('Program was edited via PUT')
        }
    })
})


module.exports = router