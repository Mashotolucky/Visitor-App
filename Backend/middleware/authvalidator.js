const {errorCode, roles} = require('../helpers/constant');

const isAdmin = (req, res, next) => {
    const role = req.user.role;

    if(role && role === roles.ADMIN)
        next();
    else{
        res.status(403).json({
            errorCode: errorCode.NOT_ADMIN,
            message: 'User is not an ADMIN',
        })
    }
};

const isTENANT = (req, res, next) => {
    const role = req.user.role;

    if(role && role === roles.TENANT)
        next();
    else{
        res.status(403).json({
            errorCode: errorCode.NOT_TENANT,
            message: 'User is not an TENANT',
        })
    }
};

const isVISITOR = (req, res, next) => {
    const role = req.user.role;

    if(role && role === roles.VISITOR)
        next();
    else{
        res.status(403).json({
            errorCode: errorCode.NOT_VISITOR,
            message: 'User is not an VISITOR',
        })
    }
};

const isUserAuthorized = (req, res, next) =>{
    const id = req.params.userId || req.body.userId;
    if(req.user.role === roles.ADMIN || id === req.user.id)
        next();
    else{
        res.status(403).json({
            errorCode: errorCodes.NOT_AUTHORIZED,
            message: 'User is not an auhtorized',
          }); 
    }
}

module.exports = {
    isAdmin,
    isTENANT,
    isVISITOR,
    isUserAuthorized
}