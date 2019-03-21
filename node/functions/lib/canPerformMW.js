canPerformJson = require('../config/config.canperform.json');

module.exports = function canPerformMW(req, res, next) {
    let role = req.role;

    let answer = false;
    console.log(role);
    if (role) {
        if (role != "ADMIN") {
            let url = req.originalUrl.split('/');
            let route = canPerformJson[url[2]];
            console.log(route);
            let method = req.method;
            if (method === "GET") {
                if (route.GETALL) {
                    answer = route.GETALL && route[method][role];
                } else {
                    answer = route[method][role] && url.length > 3;
                }
            } else {
                answer = route[method][role];
            }
        }else{
            answer = true;
        }
        if (answer) {
            next();
        } else {
            res.status(400).json({ message: "Access Denied" })
        }
    } else {
        // tokenMW hasn't touched the request
        next();
    }

}