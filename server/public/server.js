﻿
var exec = {
    createTravel(req, res, next) {
        var travel = require('../../db/models/travel')
        var obj = req.query
        console.log(obj)
        return travel.create({
            title: obj.title,
            place: obj.place,
            cover_img: obj.cover_img,
            date: obj.date
        }).then((res) => {
            return res.guid
        })
    },
}




module.exports = (req, res, next) => {
    var action = req.params.action
    Promise.resolve(action).then(function(result) {
        return exec[result](req, res, next)
    }).then(function(result) {
        res.send(result)
    }).catch(function(error) {
        res.status(500).send(error.toString())
    })
}
