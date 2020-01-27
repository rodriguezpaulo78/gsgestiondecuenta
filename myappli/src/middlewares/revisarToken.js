// ESTE MIDDLEWARE ESTA PARA CUANDO EL USUARIO INTENTA ACCEDER AL PANEL SIN LOGEARSE

module.exports = (req, res, next) => {
    const jwt = require('jsonwebtoken');
    let JWT_PASS_SECRET = "";
    if (process.env.JWT_PASS_SERVER) {
        JWT_PASS_SECRET = process.env.JWT_PASS_SERVER;
    } else {
        JWT_PASS_SECRET = "%%-M1P0d3r0s4Cl4v3-%%";
    }
    jwt.verify(
        req.cookies.sdgUsr, JWT_PASS_SECRET, (err, decoded) => {
            if (!err) {
                next();
            } else {
                console.log("DATO TOKEN ROOT:", decoded);
                res.redirect('/ingresar');
            }
        }
    );
};