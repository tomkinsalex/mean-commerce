const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Shipment = require('../models/shipment');

class ShipmentsRepository {

    // get all the shipments
    getShipments(callback) {
        console.log('*** ShipmentsRepository.getShipments');
        Shipment.countDocuments((err, shipmentsCount) => {
            let count = shipmentsCount;
            console.log(`Shipments count: ${count}`);

            Shipment.find({})
            .populate(
                { 
                    path: 'order',
                    select: 'status date_placed shipping_cost',
                    populate: {
                        path: 'customer',
                        select: 'first_name last_name email country',
                        model: 'Customer'
                    }
                })
            .exec( (err, shipments) => {
                if (err) { 
                    console.log(`*** ShipmentsRepository.getShipments error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    shipments: shipments
                });
            });

        });
    }

    getPagedShipments(skip, top, callback) {
        console.log('*** ShipmentsRepository.getPagedShipments');
        Shipment.countDocuments((err, shipmentsCount) => {
            let count = shipmentsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Shipments count: ${count}`);

            Shipment.find({})
                    .populate(
                        { 
                            path: 'order',
                            select: 'status date_placed shipping_cost',
                            populate: {
                                path: 'customer',
                                select: 'first_name last_name email country',
                                model: 'Customer'
                            }
                        })
                    .sort({date_placed: 4})
                    .skip(skip)
                    .limit(top)
                    .exec((err, shipments) => {
                        if (err) { 
                            console.log(`*** ShipmentsRepository.getPagedShipments error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            shipments: shipments
                        });
                    });

        });
    }

    /* get the shipment summary
    getShipmentsSummary(skip, top, callback) {
        console.log('*** ShipmentsRepository.getShipmentsSummary');
        Shipment.countDocuments((err, custsCount) => {
            let count = custsCount;
            console.log(`Shipments count: ${count}`);

            Shipment.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'shipmentCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, shipmentsSummary) => {
                        callback(null, {
                            count: count,
                            shipmentsSummary: shipmentsSummary
                        });
                    });

        });
    }
    */

    // get a  shipment
    getShipment(id, callback) {
        console.log('*** ShipmentsRepository.getShipment');
        Shipment.findById(id)
        .populate(
            { 
                path: 'order',
                select: 'status date_placed shipping_cost',
                populate: {
                    path: 'customer',
                    select: 'first_name last_name email country',
                    model: 'Customer'
                }
            })
        .exec( (err, shipment) => {
            if (err) { 
                console.log(`*** ShipmentsRepository.getShipment error: ${err}`); 
                return callback(err); 
            }
            callback(null, shipment);
        });
    }

    // insert a  shipment
    insertShipment(body, callback) {
        console.log('*** ShipmentsRepository.insertShipment');
        let shipment = new Shipment();
        console.log(body);

        shipment._id = new mongoose.Types.ObjectId();
        shipment.order = body.order;
        shipment.tracking_number = body.tracking_number;
        shipment.courrier_option = body.courrier_option;

        if(body.tracking_number){
            shipment.date_shipped = Date.now();
        }

        shipment.save((err, shipment) => {
            if (err) { 
                console.log(`*** ShipmentsRepository insertShipment error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, shipment);
        });
    }

    updateShipment(id, body, callback) {
        console.log('*** ShipmentsRepository.editShipment');

        Shipment.findById(id, (err, shipment)  => {
            if (err) { 
                console.log(`*** ShipmentsRepository.editShipment error: ${err}`); 
                return callback(err); 
            }

            shipment.tracking_number = body.tracking_number || shipment.tracking_number;

            if(body.tracking_number){
                shipment.date_shipped = Date.now();
            }

            shipment.save((err, shipment) => {
                if (err) { 
                    console.log(`*** ShipmentsRepository.updateShipment error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, shipment);
            });

        });
    }

    // delete a shipment
    deleteShipment(id, callback) {
        console.log('*** ShipmentsRepository.deleteShipment');
        Shipment.remove({ '_id': id }, (err, shipment) => {
            if (err) { 
                console.log(`*** ShipmentsRepository.deleteShipment error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, shipment);
        });
    }

}

module.exports = new ShipmentsRepository();