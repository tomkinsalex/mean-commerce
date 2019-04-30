const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Customer = require('../models/customer');

class CustomersRepository {

    // get all the customers
    getCustomers(callback) {
        console.log('*** CustomersRepository.getCustomers');
        Customer.countDocuments((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({})
            .populate('user', 'first_name last_name email')
            .exec((err, customers) => {
                if (err) {
                    console.log(`*** CustomersRepository.getCustomers error: ${err}`);
                    return callback(err);
                }
                callback(null, {
                    count: count,
                    customers: customers
                });
            });

        });
    }


    // get a  customer
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer');
        Customer.findById(id)
            .populate('user', 'first_name last_name email')
            .exec((err, customer) => {
                if (err) {
                    console.log(`*** CustomersRepository.getCustomer error: ${err}`);
                    return callback(err);
                }
                callback(null, customer);
            });
    }

    // get a  customer
    getCustomerByUser(id, callback) {
        console.log('*** CustomersRepository.getCustomerByUser');
        Customer.findOne({ user: id })
            .populate('user', 'first_name last_name email')
            .exec((err, customer) => {
                if (err) {
                    console.log(`*** CustomersRepository.getCustomerByUser error: ${err}`);
                    return callback(err);
                }
                callback(null, customer);
            });
    }


    // insert a  customer
    insertCustomer(body, callback) {
        console.log('*** CustomersRepository.insertCustomer');
        let customer = new Customer();

        customer._id = new mongoose.Types.ObjectId();
        customer.user = body.user;
        customer.phone_number = body.phone_number;
        customer.address = body.address;
        customer.city = body.city;
        customer.state = body.state;
        customer.zip_code = body.zip_code;
        customer.country = body.country;
        customer.payment_host_id = body.payment_host_id;

        customer.save((err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository insertCustomer error: ${err}`);
                return callback(err, null);
            }

            callback(null, customer);
        });
    }

    updateCustomer(id, body, callback) {
        console.log('*** CustomersRepository.editCustomer');

        Customer.findById(id, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.editCustomer error: ${err}`);
                return callback(err);
            }

            customer.phone_number = body.phone_number || customer.phone_number;
            customer.address = body.address || customer.address;
            customer.city = body.city || customer.city;
            customer.state = body.state || customer.state;
            customer.zip_code = body.zip_code || customer.zip_code;
            customer.country = body.country || customer.country;
            customer.payment_host_id = body.payment_host_id || customer.payment_host_id;


            customer.save((err, customer) => {
                if (err) {
                    console.log(`*** CustomersRepository.updateCustomer error: ${err}`);
                    return callback(err, null);
                }

                callback(null, customer);
            });

        });
    }

    // delete a customer
    deleteCustomer(id, callback) {
        console.log('*** CustomersRepository.deleteCustomer');
        Customer.remove({ '_id': id }, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.deleteCustomer error: ${err}`);
                return callback(err, null);
            }
            callback(null, customer);
        });
    }

}

module.exports = new CustomersRepository();