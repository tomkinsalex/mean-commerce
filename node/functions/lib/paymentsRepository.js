const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Payment = require('../models/payment');

class PaymentsRepository {

    // get all the payments
    getPayments(callback) {
        console.log('*** PaymentsRepository.getPayments');
        Payment.count((err, paymentsCount) => {
            let count = paymentsCount;
            console.log(`Payments count: ${count}`);

            Payment.find({})
            .populate(
                { 
                    path: 'order',
                    select: 'status total invoice_number',
                    populate: {
                        path: 'customer',
                        select: 'first_name last_name email payment_host_id',
                        model: 'Customer' 
                    } 
                })
            .exec( (err, payments) => {
                if (err) { 
                    console.log(`*** PaymentsRepository.getPayments error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    payments: payments
                });
            });

        });
    }

    getPagedPayments(skip, top, callback) {
        console.log('*** PaymentsRepository.getPagedPayments');
        Payment.count((err, paymentsCount) => {
            let count = paymentsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Payments count: ${count}`);

            Payment.find({})
                    .populate(
                        { 
                            path: 'order',
                            select: 'status total invoice_number',
                            populate: {
                                path: 'customer',
                                select: 'first_name last_name email payment_host_id',
                                model: 'Customer' 
                            } 
                        })
                    .sort({date_placed: 4})
                    .skip(skip)
                    .limit(top)
                    .exec((err, payments) => {
                        if (err) { 
                            console.log(`*** PaymentsRepository.getPagedPayments error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            payments: payments
                        });
                    });

        });
    }

    /* get the payment summary
    getPaymentsSummary(skip, top, callback) {
        console.log('*** PaymentsRepository.getPaymentsSummary');
        Payment.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Payments count: ${count}`);

            Payment.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'paymentCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, paymentsSummary) => {
                        callback(null, {
                            count: count,
                            paymentsSummary: paymentsSummary
                        });
                    });

        });
    }
    */

    // get a  payment
    getPayment(id, callback) {
        console.log('*** PaymentsRepository.getPayment');
        Payment.findById(id)
        .populate(
            { 
                path: 'order',
                select: 'status total invoice_number',
                populate: {
                    path: 'customer',
                    select: 'first_name last_name email payment_host_id',
                    model: 'Customer' 
                } 
            })
        .exec( (err, payment) => {
            if (err) { 
                console.log(`*** PaymentsRepository.getPayment error: ${err}`); 
                return callback(err); 
            }
            callback(null, payment);
        });
    }

    // insert a  payment
    insertPayment(body, callback) {
        console.log('*** PaymentsRepository.insertPayment');
        let payment = new Payment();
        console.log(body);

        payment._id = new mongoose.Types.ObjectId();
        payment.order = body.order;
        payment.host_charge_id = body.host_charge_id;
        payment.amount = body.amount;

        payment.save((err, payment) => {
            if (err) { 
                console.log(`*** PaymentsRepository insertPayment error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, payment);
        });
    }

    updatePayment(id, body, callback) {
        console.log('*** PaymentsRepository.editPayment');

        Payment.findById(id, (err, payment)  => {
            if (err) { 
                console.log(`*** PaymentsRepository.editPayment error: ${err}`); 
                return callback(err); 
            }

            payment.amount = body.amount || payment.amount;
            payment.host_charge_id = body.host_charge_id || payment.host_charge_id;

            payment.save((err, payment) => {
                if (err) { 
                    console.log(`*** PaymentsRepository.updatePayment error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, payment);
            });

        });
    }

    // delete a payment
    deletePayment(id, callback) {
        console.log('*** PaymentsRepository.deletePayment');
        Payment.remove({ '_id': id }, (err, payment) => {
            if (err) { 
                console.log(`*** PaymentsRepository.deletePayment error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, payment);
        });
    }

}

module.exports = new PaymentsRepository();