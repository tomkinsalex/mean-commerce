const itemtypesRepo = require('../../../lib/itemtypesRepository'),
      util = require('util');

class ItemTypesController {

    constructor(router) {
        router.get('/', this.getItemTypes.bind(this));
        router.get('/:id', this.getItemType.bind(this));
        router.post('/', this.insertItemType.bind(this));
        router.put('/:id', this.updateItemType.bind(this));
        router.delete('/:id', this.deleteItemType.bind(this));
    }

    getItemTypes(req, res) {
        console.log('*** getItemTypes');
        itemtypesRepo.getItemTypes((err, data) => {
            if (err) {
                console.log('*** getItemTypes error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getItemTypes ok');
                res.json(data.itemtypes);
            }
        });
    }

    getItemType(req, res) {
        console.log('*** getItemType');
        const id = req.params.id;
        console.log(id);

        itemtypesRepo.getItemType(id, (err, itemtype) => {
            if (err) {
                console.log('*** getItemType error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getItemType ok');
                res.json(itemtype);
            }
        });
    }

    insertItemType(req, res) {
        console.log('*** insertItemType');
        itemtypesRepo.insertItemType(req.body, (err, itemtype) => {
            if (err) {
                console.log('*** itemtypesRepo.insertItemType error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', itemtype: null});
            } else {
                console.log('*** insertItemType ok');
                res.json({ status: true, error: null, itemtype: itemtype });
            }
        });
    }

    updateItemType(req, res) {
        console.log('*** updateItemType');
        console.log('*** req.body');
        console.log(req.body);
        itemtypesRepo.updateItemType(req.params.id, req.body, (err, itemtype) => {
            if (err) {
                console.log('*** updateItemType error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', itemtype: null });
            } else {
                console.log('*** updateItemType ok');
                res.json({ status: true, error: null, itemtype: itemtype });
            }
        });
    }

    deleteItemType(req, res) {
        console.log('*** deleteItemType');

        itemtypesRepo.deleteItemType(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteItemType error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteItemType ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = ItemTypesController;