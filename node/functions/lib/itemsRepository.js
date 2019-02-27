const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Item = require('../models/item');

class ItemsRepository {

    // get all the Items
    getItems(callback) {
        console.log('*** ItemsRepository.getItems');
        Item.countDocuments((err, itemsCount) => {
            let count = itemsCount;
            console.log(`Items count: ${count}`);

            Item.find({}, (err, items) => {
                if (err) { 
                    console.log(`*** ItemsRepository.getItems error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    items: items
                });
            });

        });
    }

    // get all the Items for a ItemType
    getItemsForType(typeId, callback) {
        console.log('*** ItemsRepository.getItems');
        Item.countDocuments({ item_type: typeId }, (err, itemsCount) => {
            let count = itemsCount;
            console.log(`Items count: ${count}`);

            Item.find({ item_type: typeId }, (err, items) => {
                if (err) { 
                    console.log(`*** ItemsRepository.getItems error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    items: items
                });
            });

        });
    }
    /*
    getPagedItems(skip, top, callback) {
        console.log('*** ItemsRepository.getPagedItems');
        Item.countDocuments((err, itemsCount) => {
            let count = itemsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Items count: ${count}`);

            Item.find({})
                    .sort({lastName: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, Items) => {
                        if (err) { 
                            console.log(`*** ItemsRepository.getPagedItems error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            Items: Items
                        });
                    });

        });
    }
    
    // get the Item summary
    getItemsSummary(skip, top, callback) {
        console.log('*** ItemsRepository.getItemsSummary');
        Item.countDocuments((err, itemsCount) => {
            let count = itemsCount;
            console.log(`Items count: ${count}`);

            Item.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'orderCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, ItemsSummary) => {
                        callback(null, {
                            count: count,
                            ItemsSummary: ItemsSummary
                        });
                    });

        });
    }
    */
    // get a  Item
    getItem(id, callback) {
        console.log('*** ItemsRepository.getItem');
        Item.findById(id, (err, item) => {
            if (err) { 
                console.log(`*** ItemsRepository.getItem error: ${err}`); 
                return callback(err); 
            }
            callback(null, item);
        });
    }

    // insert a  Item
    insertItem(body, callback) {
        console.log('*** ItemsRepository.insertItem');
        let item = new Item();
        console.log(body);

        item._id = new mongoose.Types.ObjectId();
        item.type_id = body.type_id;
        item.title = body.title;
        item.name = body.name;
        item.price = body.price;
        item.description = body.description;
        item.stock = body.stock;

        item.save((err, item) => {
            if (err) { 
                console.log(`*** ItemsRepository insertItem error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, item);
        });
    }

    updateItem(id, body, callback) {
        console.log('*** ItemsRepository.editItem');


        Item.findById(id, (err, item)  => {
            if (err) { 
                console.log(`*** ItemsRepository.editItem error: ${err}`); 
                return callback(err); 
            }

        item.type_id = body.type_id || item.type_id;
        item.title = body.title || item.title;
        item.name = body.name || item.name;
        item.price = body.price || item.price;
        item.description = body.description || item.description;
        item.stock = body.stock || item.stock;


            Item.save((err, item) => {
                if (err) { 
                    console.log(`*** ItemsRepository.updateItem error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, item);
            });

        });
    }

    // delete a Item
    deleteItem(id, callback) {
        console.log('*** ItemsRepository.deleteItem');
        Item.remove({ '_id': id }, (err, item) => {
            if (err) { 
                console.log(`*** ItemsRepository.deleteItem error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, item);
        });
    }

}

module.exports = new ItemsRepository();