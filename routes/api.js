var express = require('express');
var router = express.Router();
var utils = require('./utils');

const { items, getID, getItemIndexInArray } = utils;

// GET: Получить список оборудования
router.get('/hardware', (req, res) => {
    res.json(items);
});

// GET: Получить оборудование по ID
router.get('/hardware/:ID', (req, res) => {
    const id = req.params.ID;
    const index = getItemIndexInArray(id);
    res.json(items[index]);
});

// POST: Добавление нового спортсмена
router.post('/hardware/add', (req, res) => {
    const body = req.body;
    const hardware = {
        ID: getID(),
        roomNo: body.roomNo,
        item: body.item,
        responsible: body.responsible
    };
    items.push(hardware);
    res.json(items);
});

// GET: Удаление спортсмена по ID
router.get('/hardware/delete/:ID', (req, res) => {
    const id = req.params.ID;
    const index = getItemIndexInArray(id);
    if (index !== -1) {
        items.splice(index, 1);
    }
    res.json(items);
});

// POST: Редактирование информации о спортсмене
router.post('/hardware/edit/:ID', (req, res) => {
    const body = req.body;
    const id = req.params.ID;
    const index = getItemIndexInArray(id);
    items[index] = {
        ID: body.ID,
        roomNo: body.roomNo,
        item: body.item,
        responsible: body.responsible
    };
    res.json(items);
});

module.exports = router;
