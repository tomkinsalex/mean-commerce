const itemsRepo = require('../../../lib/itemsRepository'),
      util = require('util');

class ItemsController {

    constructor(router) {
        router.get('/', this.getItems.bind(this));
        router.get('/type/:id', this.getItemsForType.bind(this));
        router.get('/:id', this.getItem.bind(this));
        router.post('/', this.insertItem.bind(this));
        router.put('/:id', this.updateItem.bind(this));
        router.delete('/:id', this.deleteItem.bind(this));
    }

    getItems(req, res) {
        console.log('*** getItems');
        itemsRepo.getItems((err, data) => {
            if (err) {
                console.log('*** getItems error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getItems ok');
                res.json(data.items);
            }
        });
    }
    /*
    getItemsPage(req, res) {
        console.log('*** getItemsPage');
    }
    */
   getItemsForType(req, res) {
    console.log('*** getItemForType');
    const typeId = req.params.id;
    console.log(typeId);

    itemsRepo.getItemsForType(typeId, (err, items) => {
        if (err) {
            console.log('*** getItem error: ' + util.inspect(err));
            res.json(null);
        } else {
            console.log('*** getItem ok');
            res.json(items);
        }
    });
    }

    getItem(req, res) {
        console.log('*** getItem');
        const id = req.params.id;
        console.log(id);

        itemsRepo.getItem(id, (err, item) => {
            if (err) {
                console.log('*** getItem error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getItem ok');
                res.json(item);
            }
        });
    }

    insertItem(req, res) {
        console.log('*** insertItem');

        itemsRepo.insertItem(req.body,(err, item) => {
            if (err) {
                    console.log('*** ItemsRepo.insertItem error: ' + util.inspect(err));
                    res.json({status: false, error: 'Insert failed', item: null});
                } else {
                    console.log('*** insertItem ok');
                    res.json({ status: true, error: null, item: item });
            }
        });
    }

    updateItem(req, res) {
        console.log('*** updateItem');
        console.log('*** req.body');
        console.log(req.body);
        itemsRepo.updateItem(req.params.id, req.body, (err, item) => {
            if (err) {
                console.log('*** updateItem error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', item: null });
            } else {
                console.log('*** updateItem ok');
                res.json({ status: true, error: null, item: item });
            }
        });
    }

    deleteItem(req, res) {
        console.log('*** deleteItem');

        itemsRepo.deleteItem(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteItem error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteItem ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = ItemsController;