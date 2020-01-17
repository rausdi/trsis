var express = require('express');
var router = express.Router();
var utils = require('./utils');

const { items, getID, getItemIndexInArray } = utils;

router.get('/', function(req, res, next) {
  res.render('index', {
      hardwareItems: items
  });
});

router.get('/add/', function(req, res) {
    res.render('addHardware');
});

router.post('/add/', function(req, res) {
    const hardware = req.body;
    items.push({
        ID: getID(),
        roomNo: hardware.roomNo,
        item: hardware.item,
        responsible: hardware.responsible
    });
    res.redirect('/');
});

router.post('/delete/:id', function (req, res) {
    const id = req.params.id;
    const index = getItemIndexInArray(id);
    if (index !== -1) {
        items.splice(index, 1);
    }
    res.redirect('/');
});

router.get('/edit/:id', function (req, res) {
    const id = req.params.id;
    const index = getItemIndexInArray(id);
    res.render('editHardware', {
        hardware: items[index],
    });
});

router.post('/edit/:id', function (req, res) {
    const hardware = req.body;
    const id = req.params.id;
    const index = getItemIndexInArray(id);
    items[index] = {
        ID: id,
        roomNo: hardware.roomNo,
        item: hardware.item,
        responsible: hardware.responsible
    };
    res.redirect('/');
});

module.exports = router;
