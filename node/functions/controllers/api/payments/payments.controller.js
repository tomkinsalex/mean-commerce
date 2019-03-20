const paymentsRepo = require('../../../lib/paymentsRepository'),
      util = require('util'),
      verifyTokenMW   = require('../../../lib/tokenMiddleware');

class PaymentsController {

    constructor(router) {
        router.all('*', verifyTokenMW);

        router.get('/', this.getPayments.bind(this));
        router.get('/:id', this.getPayment.bind(this));
        router.post('/', this.insertPayment.bind(this));
        router.put('/:id', this.updatePayment.bind(this));
        router.delete('/:id', this.deletePayment.bind(this));
    }

    getPayments(req, res) {
        console.log('*** getPayments');
        paymentsRepo.getPayments((err, data) => {
            if (err) {
                console.log('*** getPayments error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getPayments ok');
                res.json(data.payments);
            }
        });
    }


    getPayment(req, res) {
        console.log('*** getPayment');
        const id = req.params.id;
        console.log(id);

        paymentsRepo.getPayment(id, (err, payment) => {
            if (err) {
                console.log('*** getPayment error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getPayment ok');
                res.json(payment);
            }
        });
    }

    insertPayment(req, res) {
        console.log('*** insertPayment');
        paymentsRepo.insertPayment(req.body, (err, payment) => {
            if (err) {
                console.log('*** paymentsRepo.insertPayment error: ' + util.inspect(err));
                res.json({status: false, error: 'Insert failed', payment: null});
            } else {
                console.log('*** insertPayment ok');
                res.json({ status: true, error: null, payment: payment });
            }
        });
    }

    updatePayment(req, res) {
        console.log('*** updatePayment');
        console.log('*** req.body');
        console.log(req.body);
        paymentsRepo.updatePayment(req.params.id, req.body, (err, payment) => {
            if (err) {
                console.log('*** updatePayment error: ' + util.inspect(err));
                res.json({ status: false, error: 'Update failed', payment: null });
            } else {
                console.log('*** updatePayment ok');
                res.json({ status: true, error: null, payment: payment });
            }
        });
    }

    deletePayment(req, res) {
        console.log('*** deletePayment');

        paymentsRepo.deletePayment(req.params.id, (err) => {
            if (err) {
                console.log('*** deletePayment error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deletePayment ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = PaymentsController;