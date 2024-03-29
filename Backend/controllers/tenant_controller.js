const {getAllTenantsDb, getTotalTenantsDb, getTenantsCheckedInDb, checkedinDb, checkedoutDb, searchTenantsDb} = require('../db/tenant.db');

const getAllTenants = async (req, res, next) =>{
    try {
        const tenants = await getAllTenantsDb();

        return res.status(200).send(tenants);
    } catch (error) {
        next(error);
    }
}

const getTotalTenants = async (req, res, next) =>{
    try {
        const tenants = await getTotalTenantsDb();

        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
}

const getTenantsCheckedIn = async (req, res, next) =>{
    try {
        const tenants = await getTenantsCheckedInDb();
        return res.status(200).send(tenants);
    } catch (error) {
        next(error);
    }
}

const checkedin = async (req, res, next) =>{
    if(!req.body){return next(new Error('Missing values!'));}

    try {
        const data = req.body;

        const tenant = await checkedinDb(data);
        return res.status(200).send(tenant);
    } catch (error) {
        next(error);
    }
}

const checkedout = async (req, res, next) =>{
    if(!req.body){return next(new Error('Missing values!'));}

    try {
        const data = req.body;

        const tenant = await checkedoutDb(data);
        return res.status(200).send(tenant);
    } catch (error) {
        next(error);
    }
}

const searchTenants = async (req, res, next) =>{
    if(!req.params){return next(new Error('Missing search values!'));}

    try {
        const name = req.params.name;
        console.log(name);
        const tenants = await searchTenantsDb(name);
        return res.status(200).send(tenants);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTenants,
    getTotalTenants,
    getTenantsCheckedIn,
    checkedin,
    checkedout,
    searchTenants
}