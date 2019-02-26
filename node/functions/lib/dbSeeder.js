// Module dependencies
const   mongoose = require('mongoose'),
        Item = require('../models/item'),
        Order = require('../models/order'),
        OrderItem = require('../models/order-item'),
        ItemType = require('../models/item-type'),
        Customer = require('../models/customer'),
        Payment = require('../models/payment');
       

class DBSeeder {
    
    init() {
        mongoose.connection.db.listCollections(
            { name: 'items' },
            { name: 'item_types' },
            { name: 'orders' },
            { name: 'order_items' },
            { name: 'payments' },
            { name: 'shipments' },
            { name: 'customers' }
        )
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }
    
    seed() {

        console.log('Seeding data....');
        //ItemTypes
        var itemTypeNames =
        [
            "Parent Type, Parent Item Type Description",
            "Type1,Item Type Description 1",
            "Type2,Item Type Description 2",
            "Type3,Item Type Description 3",
            "Type4,Item Type Description 4",
        ];
        //Items
        var itemNames =
        [
            "Item Indigo - Indigo,a_indigo,45.00,Something nice,5",
            "Item Grey - Grey,a_grey,45.00,Something nice,3",
            "Item Purple - Purple,a_purple,45.00,Something nice,2",
            "Item Blue - Blue,a_blue,45.00,Something nice,1",
            "Item Brown - Brown,a_brown,45.00,Something nice,9",
        ];
        //Items
        var customerData =
        [
            "Marcus,HighTower,acmecorp.com,1234 Anywhere St.,Raleigh, Florida,D0OJNvobi4NLZoRa3amfputFxpk1",
            "Jesse,Smith,gmail.com,435 Main St.,New York, New York,0V1f2xBD27XY9QnydGEBVoFNRj82",
        ];
        var phoneNumber = 5142563232;
        var zip = '85229';
        var country = 'US';

        var l = itemTypeNames.length,
            i, e;

        var ids = [];
        /* ----------- Loop for ItemTypes -----------*/
        for (i = 0; i < l; i++) {
            var nameGenderHost = itemTypeNames[i].split(',');
            var itemType = new ItemType({
                _id: new mongoose.Types.ObjectId(),
                name: nameGenderHost[0],
                description: nameGenderHost[1]
            });
            if(ids.length > 0){
                itemType.parent_type = ids[0];
            }
            ids.push(itemType._id);
            itemType.save((err, itmt) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted itemType: ' + itmt.name);
                }
            });

        }

        /* ----------- Loop for Item -----------*/
        for (i = 0; i < l; i++) {
            var nameGenderHost = itemNames[i].split(',');
            var item = new Item({
                _id: new mongoose.Types.ObjectId(),
                item_type: ids[i],
                title: nameGenderHost[0],
                name: nameGenderHost[1],
                price: nameGenderHost[2],
                description: nameGenderHost[3],
                stock: nameGenderHost[4]
            });
            item.save((err, itm) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted item: ' + itm.title);
                }
            });
        }


        ids = [];
        /* ----------- Loop for Customer -----------*/
        for (i = 0; i < customerData.length; i++) {
            var nameGenderHost = customerData[i].split(',');
            var customer = new Customer({
                _id: new mongoose.Types.ObjectId(),
                first_name: nameGenderHost[0],
                last_name: nameGenderHost[1],
                email: (nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[2]).toLowerCase(),
                phone_number: phoneNumber,
                address: nameGenderHost[3],
                city: nameGenderHost[4],
                state: nameGenderHost[5],
                zip_code: zip,
                country: country,
                auth_id: nameGenderHost[6]
            });
            ids.push(customer._id);
            customer.save((err, cust) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted customer: ' + cust.last_name);
                }
            });
        }
    }
}

module.exports = new DBSeeder();




