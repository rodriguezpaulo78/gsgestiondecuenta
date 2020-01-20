// ESTE MIDDLEWARE ESTA HECHO PARA LAS RUTAS DONDE REACT EMPIEZE A CONSUMIR LA DATA DEL SERVIDOR

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
                req.body.dataToken = decoded;
                console.log("DATOS TOKEN REACT:", decoded);
                next();
            } else {
                res.send({"status": "error", "msg": "Token Invalido, vuelva a iniciar sesión", "data": []});
            }
        }
    );
};