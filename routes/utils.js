const items = [
    {
        ID: getID(),
        roomNo: '#12345',
        item: 'Маршрутизатор',
        responsible: 'Иван'
    },
    {
        ID: getID(),
        roomNo: '#12345',
        item: 'Маршрутизатор',
        responsible: 'Иван'
    },
    {
        ID: getID(),
        roomNo: '#12345',
        item: 'Маршрутизатор',
        responsible: 'Иван'
    },
];

function getID() {
    return Math.random().toString(36).substr(2, 9);
}

function getItemIndexInArray(id) {
    let index = -1;
    items.find(function (item, i) {
        if (item.ID === id) {
            index = i;
        }
    });

    return index;
}

module.exports = {
    items, getID, getItemIndexInArray
};