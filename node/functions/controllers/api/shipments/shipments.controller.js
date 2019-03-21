const   shipmentsRepo = require('../../../lib/shipmentsRepository'),
        util = require('util');

class ShipmentsController {

    constructor(router) {
        router.get('/', this.getShipments.bind(this));
        router.get('/page/:skip/:top', this.getShipmentsPage.bind(this));
        router.get('/:id', this.getShipment.bind(this));
        router.post('/', this.insertShipment.bind(this));
        router.put('/:id', this.updateShipment.bind(this));
        router.delete('/:id', this.deleteShipment.bind(this));
    }

    getShipments(req, res) {
        console.log('*** getShipments');
        shipmentsRepo.getShipments((err, data) => {
            if (err) {
                console.log('*** getShipments error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getShipments ok');
                res.json(data.shipments);
            }
        });
    }

    getShipmentsPage(req, res) {
        console.log('*** getShipmentsPage');
        const topVal = req.params.top,
              skipVal = req.params.skip,
              top = (isNaN(topVal)) ? 10 : +topVal,
              skip = (isNaN(skipVal)) ? 0 : +skipVal;

        shipmentsRepo.getPagedShipments(skip, top, (err, data) => {
            res.setHeader('X-InlineCount', data.count);
            if (err) {
                console.log('*** getShipmentsPage error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getShipmentsPage ok');
                res.json(data.shipments);
            }
        });
    }

    getShipment(req, res) {
        console.log('*** getShipment');
        const id = req.params.id;
        console.log(id);

        shipmentsRepo.getShipment(id, (err, shipment) => {
            if (err) {
                console.log('*** getShipment error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getShipment ok');
                res.json(shipment);
            }
        });
    }

    insertShipment(req, res) {
        console.log('*** insertShipment');
        shipmentsRepo.insertShipment(req.body, (err, shipment) => {
            if (err) {
                console.log('*** shipmentsRepo.insertShipment error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', shipment: null});
            } else {
                console.log('*** insertShipment ok');
                res.json({ status: true, error: null, shipment: shipment });
            }
        });
    }

    updateShipment(req, res) {
        console.log('*** updateShipment');
        console.log('*** req.body');
        console.log(req.body);
        shipmentsRepo.updateShipment(req.params.id, req.body, (err, shipment) => {
            if (err) {
                console.log('*** updateShipment error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', shipment: null });
            } else {
                console.log('*** updateShipment ok');
                res.json({ status: true, error: null, shipment: shipment });
            }
        });
    }

    deleteShipment(req, res) {
        console.log('*** deleteShipment');

        shipmentsRepo.deleteShipment(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteShipment error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteShipment ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = ShipmentsController;