const orderitemsRepo = require('../../../lib/orderitemsRepository'),
      util = require('util');

class OrderItemsController {

    constructor(router) {
        router.get('/', this.getOrderItems.bind(this));
        router.get('/order/:id', this.getOrderItemsForOrder.bind(this));
        router.get('/page/:skip/:top', this.getOrderItemsPage.bind(this));
        router.get('/:id', this.getOrderItem.bind(this));
        router.post('/', this.insertOrderItem.bind(this));
        router.put('/:id', this.updateOrderItem.bind(this));
        router.delete('/:id', this.deleteOrderItem.bind(this));
    }

    getOrderItems(req, res) {
        console.log('*** getOrderItems');
        orderitemsRepo.getOrderItems((err, data) => {
            if (err) {
                console.log('*** getOrderItems error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getOrderItems ok');
                res.json(data.orderitems);
            }
        });
    }

    getOrderItemsForOrder(req, res) {
        console.log('*** getOrderItemsForOrder');
        const orderId = req.params.id;

        orderitemsRepo.getOrderItemsForOrder(orderId, (err, data) => {
            if (err) {
                console.log('*** getOrderItemsForOrder error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getOrderItemsForOrder ok');
                res.json(data.orderitems);
            }
        });
    }   

    getOrderItemsPage(req, res) {
        console.log('*** getOrderItemsPage');
        const topVal = req.params.top,
              skipVal = req.params.skip,
              top = (isNaN(topVal)) ? 10 : +topVal,
              skip = (isNaN(skipVal)) ? 0 : +skipVal;

        orderitemsRepo.getPagedOrderItems(skip, top, (err, data) => {
            res.setHeader('X-InlineCount', data.count);
            if (err) {
                console.log('*** getOrderItemsPage error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getOrderItemsPage ok');
                res.json(data.orderitems);
            }
        });
    }

    getOrderItem(req, res) {
        console.log('*** getOrderItem');
        const id = req.params.id;
        console.log(id);

        orderitemsRepo.getOrderItem(id, (err, orderitem) => {
            if (err) {
                console.log('*** getOrderItem error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getOrderItem ok');
                res.json(orderitem);
            }
        });
    }

    insertOrderItem(req, res) {
        console.log('*** insertOrderItem');
        orderitemsRepo.insertOrderItem(req.body, (err, orderitem) => {
            if (err) {
                console.log('*** orderitemsRepo.insertOrderItem error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', orderitem: null});
            } else {
                console.log('*** insertOrderItem ok');
                res.json({ status: true, error: null, orderitem: orderitem });
            }
        });
    }

    updateOrderItem(req, res) {
        console.log('*** updateOrderItem');
        console.log('*** req.body');
        console.log(req.body);
        orderitemsRepo.updateOrderItem(req.params.id, req.body, (err, orderitem) => {
            if (err) {
                console.log('*** updateOrderItem error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', orderitem: null });
            } else {
                console.log('*** updateOrderItem ok');
                res.json({ status: true, error: null, orderitem: orderitem });
            }
        });
    }

    deleteOrderItem(req, res) {
        console.log('*** deleteOrderItem');

        orderitemsRepo.deleteOrderItem(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteOrderItem error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteOrderItem ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = OrderItemsController;