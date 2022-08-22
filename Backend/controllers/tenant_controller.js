const {getAllTenantsDb} = require('../db/tenant.db');

const getAllTenants = async (req, res, next) =>{
    try {
        const tenants = await getAllTenantsDb();

        return res.status(200).send(tenants);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTenants
}