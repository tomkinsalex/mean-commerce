const ordersRepo = require('../../../lib/ordersRepository'),
      util = require('util');

class OrdersController {

    constructor(router) {
        router.get('/', this.getOrders.bind(this));
        router.get('/:id', this.getOrder.bind(this));
        router.post('/', this.insertOrder.bind(this));
        router.put('/:id', this.updateOrder.bind(this));
        router.delete('/:id', this.deleteOrder.bind(this));
    }

    getOrders(req, res) {
        console.log('*** getOrders');
        ordersRepo.getOrders((err, data) => {
            if (err) {
                console.log('*** getOrders error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getOrders ok');
                res.json(data.orders);
            }
        });
    }

    getOrder(req, res) {
        console.log('*** getOrder');
        const id = req.params.id;
        console.log(id);

        ordersRepo.getOrder(id, (err, order) => {
            if (err) {
                console.log('*** getOrder error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getOrder ok');
                res.json(order);
            }
        });
    }

    insertOrder(req, res) {
        console.log('*** insertOrder');
        ordersRepo.insertOrder(req.body, (err, order) => {
            if (err) {
                console.log('*** ordersRepo.insertOrder error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', order: null});
            } else {
                console.log('*** insertOrder ok');
                res.json({ status: true, error: null, order: order });
            }
        });
    }

    updateOrder(req, res) {
        console.log('*** updateOrder');
        console.log('*** req.body');
        console.log(req.body);
        ordersRepo.updateOrder(req.params.id, req.body, (err, order) => {
            if (err) {
                console.log('*** updateOrder error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', order: null });
            } else {
                console.log('*** updateOrder ok');
                res.json({ status: true, error: null, order: order });
            }
        });
    }

    deleteOrder(req, res) {
        console.log('*** deleteOrder');

        ordersRepo.deleteOrder(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteOrder error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteOrder ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = OrdersController;