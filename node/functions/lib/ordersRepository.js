const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Order = require('../models/order');

class OrdersRepository {

    // get all the orders
    getOrders(callback) {
        console.log('*** OrdersRepository.getOrders');
        Order.count((err, ordersCount) => {
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

    getPagedOrders(skip, top, callback) {
        console.log('*** OrdersRepository.getPagedOrders');
        Order.count((err, ordersCount) => {
            let count = ordersCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Orders count: ${count}`);

            Order.find({})
                    .populate('customer', 'first_name last_name email payment_host_id')
                    .sort({date_placed: 4})
                    .skip(skip)
                    .limit(top)
                    .exec((err, orders) => {
                        if (err) { 
                            console.log(`*** OrdersRepository.getPagedOrders error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            orders: orders
                        });
                    });

        });
    }

    /* get the order summary
    getOrdersSummary(skip, top, callback) {
        console.log('*** OrdersRepository.getOrdersSummary');
        Order.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Orders count: ${count}`);

            Order.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'orderCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, ordersSummary) => {
                        callback(null, {
                            count: count,
                            ordersSummary: ordersSummary
                        });
                    });

        });
    }
    */

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

        // Find Latest Invoice
        findLatestInvoice(callback) {
            console.log('*** OrdersRepository.findLatestInvoice');
            Order.findOne()
            .sort('-invoice_number')
            .exec( (err, order) => {
                if (err) { 
                    console.log(`*** OrdersRepository.findLatestInvoice error: ${err}`); 
                    return callback(err); 
                }
                console.log(order);
                callback(null, order.invoice_number);
            });
        }
    

}

module.exports = new OrdersRepository();