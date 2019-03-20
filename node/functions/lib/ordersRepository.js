const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Order = require('../models/order');

class OrdersRepository {

    // get all the orders
    getOrders(callback) {
        console.log('*** OrdersRepository.getOrders');
        Order.countDocuments((err, ordersCount) => {
            let count = ordersCount;
            console.log(`Orders count: ${count}`);

            Order.find({})
            .populate('customer', 'first_name last_name email payment_host_id')
            .exec( (err, orders) => {
                if (err) { 
                    console.log(`*** OrdersRepository.getOrders error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    orders: orders
                });
            });

        });
    }

    // get a  order
    getOrder(id, callback) {
        console.log('*** OrdersRepository.getOrder');
        Order.findById(id)
        .populate('customer', 'first_name last_name email payment_host_id')
        .exec( (err, order) => {
            if (err) { 
                console.log(`*** OrdersRepository.getOrder error: ${err}`); 
                return callback(err); 
            }
            callback(null, order);
        });
    }

    // insert a  order
    insertOrder(body, callback) {
        console.log('*** OrdersRepository.insertOrder');
        let order = new Order();
        console.log(body);

        order._id = new mongoose.Types.ObjectId();
        order.customer = body.customer;
        order.status = body.status;
        order.notes = body.notes;
        order.sub_total = body.sub_total;
        order.shipping_cost = body.shipping_cost;
        order.total = body.total;
        order.invoice_number = body.invoice_number;

        order.save((err, order) => {
            if (err) { 
                console.log(`*** OrdersRepository insertOrder error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, order);
        });
    }

    updateOrder(id, body, callback) {
        console.log('*** OrdersRepository.editOrder');

        Order.findById(id, (err, order)  => {
            if (err) { 
                console.log(`*** OrdersRepository.editOrder error: ${err}`); 
                return callback(err); 
            }

            order.status = body.status || order.status;
            order.notes = body.notes || order.notes;
            order.sub_total = body.sub_total || order.sub_total;
            order.shipping_cost = body.shipping_cost || order.shipping_cost;
            order.total = body.total || order.total;

            order.save((err, order) => {
                if (err) { 
                    console.log(`*** OrdersRepository.updateOrder error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, order);
            });

        });
    }

    // delete a order
    deleteOrder(id, callback) {
        console.log('*** OrdersRepository.deleteOrder');
        Order.remove({ '_id': id }, (err, order) => {
            if (err) { 
                console.log(`*** OrdersRepository.deleteOrder error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, order);
        });
    }    

}

module.exports = new OrdersRepository();