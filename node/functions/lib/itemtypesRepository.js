const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ItemType = require('../models/item-type');

class ItemTypesRepository {

    // get all the itemtypes
    getItemTypes(callback) {
        console.log('*** ItemTypesRepository.getItemTypes');
        ItemType.count((err, itemtypesCount) => {
            let count = itemtypesCount;
            console.log(`ItemTypes count: ${count}`);

            ItemType.find({})
            .populate('parent_type', 'name')
            .exec( (err, itemtypes) => {
                if (err) { 
                    console.log(`*** ItemTypesRepository.getItemTypes error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    itemtypes: itemtypes
                });
            });

        });
    }

    getPagedItemTypes(skip, top, callback) {
        console.log('*** ItemTypesRepository.getPagedItemTypes');
        ItemType.count((err, itemtypesCount) => {
            let count = itemtypesCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`ItemTypes count: ${count}`);

            ItemType.find({})
                    .populate('parent_type', 'name')
                    .sort({date_placed: 4})
                    .skip(skip)
                    .limit(top)
                    .exec((err, itemtypes) => {
                        if (err) { 
                            console.log(`*** ItemTypesRepository.getPagedItemTypes error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            itemtypes: itemtypes
                        });
                    });

        });
    }

    /* get the itemtype summary
    getItemTypesSummary(skip, top, callback) {
        console.log('*** ItemTypesRepository.getItemTypesSummary');
        ItemType.count((err, custsCount) => {
            let count = custsCount;
            console.log(`ItemTypes count: ${count}`);

            ItemType.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'itemtypeCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, itemtypesSummary) => {
                        callback(null, {
                            count: count,
                            itemtypesSummary: itemtypesSummary
                        });
                    });

        });
    }
    */

    // get a  itemtype
    getItemType(id, callback) {
        console.log('*** ItemTypesRepository.getItemType');
        ItemType.findById(id)
        .populate('parent_type', 'name')
        .exec( (err, itemtype) => {
            if (err) { 
                console.log(`*** ItemTypesRepository.getItemType error: ${err}`); 
                return callback(err); 
            }
            callback(null, itemtype);
        });
    }

    // insert a  itemtype
    insertItemType(body, callback) {
        console.log('*** ItemTypesRepository.insertItemType');
        let itemtype = new ItemType();
        console.log(body);

        itemtype._id = new mongoose.Types.ObjectId();
        itemtype.parent_type = body.parent_type;
        itemtype.name = body.name;
        itemtype.description = body.description;

        itemtype.save((err, itemtype) => {
            if (err) { 
                console.log(`*** ItemTypesRepository insertItemType error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, itemtype);
        });
    }

    updateItemType(id, body, callback) {
        console.log('*** ItemTypesRepository.editItemType');

        ItemType.findById(id, (err, itemtype)  => {
            if (err) { 
                console.log(`*** ItemTypesRepository.editItemType error: ${err}`); 
                return callback(err); 
            }

            itemtype.parent_type = body.parent_type|| itemtype.parent_type; 
            itemtype.name = body.name || itemtype.name;
            itemtype.description = body.description || itemtype.description;

            itemtype.save((err, itemtype) => {
                if (err) { 
                    console.log(`*** ItemTypesRepository.updateItemType error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, itemtype);
            });

        });
    }

    // delete a itemtype
    deleteItemType(id, callback) {
        console.log('*** ItemTypesRepository.deleteItemType');
        ItemType.remove({ '_id': id }, (err, itemtype) => {
            if (err) { 
                console.log(`*** ItemTypesRepository.deleteItemType error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, itemtype);
        });
    }

}

module.exports = new ItemTypesRepository();