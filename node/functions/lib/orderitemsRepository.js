const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      OrderItem = require('../models/order-item');

class OrderItemsRepository {

    // get all the orderitems
    getOrderItems(callback) {
        console.log('*** OrderItemsRepository.getOrderItems');
        OrderItem.countDocuments((err, orderitemsCount) => {
            let count = orderitemsCount;
            console.log(`OrderItems count: ${count}`);

            OrderItem.find({})
            .populate(
                { 
                    path: 'order',
                    select: 'date_placed ',
                    populate: {
                        path: 'customer',
                        select: 'first_name last_name email state country',
                        model: 'Customer'
                    }
                })
                .populate(
                    { 
                        path: 'item',
                        select: 'title price stock',
                        populate: {
                            path: 'item_type',
                            select: 'name',
                            model: 'ItemType'
                        }
                    })
            .exec( (err, orderitems) => {
                if (err) { 
                    console.log(`*** OrderItemsRepository.getOrderItems error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    orderitems: orderitems
                });
            });

        });
    }

    getOrderItemsForOrder(orderId, callback) {
        console.log('*** OrderItemsRepository.getOrderItems');
        OrderItem.countDocuments({ order: orderId }, (err, orderitemsCount) => {
            let count = orderitemsCount;
            console.log(`OrderItems count: ${count}`);
            OrderItem.find({ order: orderId })
            .populate(
                { 
                    path: 'order',
                    select: 'date_placed ',
                    populate: {
                        path: 'customer',
                        select: 'first_name last_name email',
                        model: 'Customer'
                    }
                })
                .populate(
                    { 
                        path: 'item',
                        select: 'title price stock',
                        populate: {
                            path: 'item_type',
                            select: 'name',
                            model: 'ItemType'
                        }
                    })
            .exec( (err, orderitems) => {
                if (err) { 
                    console.log(`*** OrderItemsRepository.getOrderItems error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    orderitems: orderitems
                });
            });

        });
    }

    // get a  orderitem
    getOrderItem(id, callback) {
        console.log('*** OrderItemsRepository.getOrderItem');
        OrderItem.findById(id)
        .populate(
            { 
                path: 'order',
                select: 'status date_placed',
                populate: {
                    path: 'customer',
                    select: 'first_name last_name email state country',
                    model: 'Customer'
                }
            })
            .populate(
                { 
                    path: 'item',
                    select: 'title price stock',
                    populate: {
                        path: 'item_type',
                        select: 'name',
                        model: 'ItemType'
                    }
                })
        .exec( (err, orderitem) => {
            if (err) { 
                console.log(`*** OrderItemsRepository.getOrderItem error: ${err}`); 
                return callback(err); 
            }
            callback(null, orderitem);
        });
    }

    // insert a  orderitem
    insertOrderItem(body, callback) {
        console.log('*** OrderItemsRepository.insertOrderItem');
        let orderitem = new OrderItem();
        console.log(body);

        orderitem._id = new mongoose.Types.ObjectId();
        orderitem.order = body.order;
        orderitem.item = body.item;
        orderitem.price = body.price;
        orderitem.quantity = body.quantity;

        orderitem.save((err, orderitem) => {
            if (err) { 
                console.log(`*** OrderItemsRepository insertOrderItem error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, orderitem);
        });
    }

    updateOrderItem(id, body, callback) {
        console.log('*** OrderItemsRepository.editOrderItem');

        OrderItem.findById(id, (err, orderitem)  => {
            if (err) { 
                console.log(`*** OrderItemsRepository.editOrderItem error: ${err}`); 
                return callback(err); 
            }

            orderitem.price = body.price || orderitem.price;
            orderitem.quantity = body.quantity || orderitem.quantity;


            orderitem.save((err, orderitem) => {
                if (err) { 
                    console.log(`*** OrderItemsRepository.updateOrderItem error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, orderitem);
            });

        });
    }

    // delete a orderitem
    deleteOrderItem(id, callback) {
        console.log('*** OrderItemsRepository.deleteOrderItem');
        OrderItem.remove({ '_id': id }, (err, orderitem) => {
            if (err) { 
                console.log(`*** OrderItemsRepository.deleteOrderItem error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, orderitem);
        });
    }

}

module.exports = new OrderItemsRepository();