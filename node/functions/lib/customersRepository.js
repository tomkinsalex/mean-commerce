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

            Customer.find({}, (err, customers) => {
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

    getPagedCustomers(skip, top, callback) {
        console.log('*** CustomersRepository.getPagedCustomers');
        Customer.countDocuments((err, custsCount) => {
            let count = custsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Customers count: ${count}`);

            Customer.find({})
                    .sort({last_name: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, customers) => {
                        if (err) { 
                            console.log(`*** CustomersRepository.getPagedCustomers error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            customers: customers
                        });
                    });

        });
    }

    /* get the customer summary
    getCustomersSummary(skip, top, callback) {
        console.log('*** CustomersRepository.getCustomersSummary');
        Customer.countDocuments((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'orderCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, customersSummary) => {
                        callback(null, {
                            count: count,
                            customersSummary: customersSummary
                        });
                    });

        });
    }
    */

    // get a  customer
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer');
        Customer.findById(id, (err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository.getCustomer error: ${err}`); 
                return callback(err); 
            }
            callback(null, customer);
        });
    }

        // get a  customer
        getCustomerByAuth(id, callback) {
            console.log('*** CustomersRepository.getCustomerByAuth');
            Customer.findOne( {'auth_id': id }, (err, customer) =>{
                if (err) { 
                    console.log(`*** CustomersRepository.getCustomerByAuth error: ${err}`); 
                    return callback(err); 
                }
                callback(null, customer);
            } );
        }
        // get a  customer
        getCustomerByEmail(email, callback) {
            console.log('*** CustomersRepository.getCustomerByEmail');
            Customer.findOne( {'email': email.toLowerCase() }, (err, customer) =>{
                if (err) { 
                    console.log(`*** CustomersRepository.getCustomerByEmail error: ${err}`); 
                    return callback(err); 
                }
                callback(null, customer);
            } );
        }

    // insert a  customer
    insertCustomer(body, callback) {
        console.log('*** CustomersRepository.insertCustomer');
        let customer = new Customer();

        customer._id = new mongoose.Types.ObjectId();
        customer.first_name = body.first_name;
        customer.last_name = body.last_name;
        customer.email = body.email.toLowerCase();
        customer.phone_number = body.phone_number;
        customer.address = body.address;
        customer.city = body.city;
        customer.state = body.state;
        customer.zip_code = body.zip_code;
        customer.countDocumentsry = body.countDocumentsry;
        customer.auth_id = body.auth_id
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

        Customer.findById(id, (err, customer)  => {
            if (err) { 
                console.log(`*** CustomersRepository.editCustomer error: ${err}`); 
                return callback(err); 
            }

            customer.first_name = body.first_name || customer.first_name;
            customer.last_name = body.last_name || customer.last_name;
            customer.email = body.email.toLowerCase() || customer.email;
            customer.phone_number = body.phone_number || customer.phone_number;
            customer.address = body.address || customer.address;
            customer.city = body.city || customer.city;
            customer.state = body.state || customer.state;
            customer.zip_code = body.zip_code || customer.zip_code;
            customer.countDocumentsry = body.countDocumentsry || customer.countDocumentsry;
            customer.auth_id = body.auth_id || customer.auth_id;
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