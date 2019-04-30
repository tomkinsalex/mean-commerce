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
        item.item_type = body.item_type;
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

        item.item_type = body.item_type || item.item_type;
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