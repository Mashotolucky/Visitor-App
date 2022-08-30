const {addVisitorDb, getALLCheckedInVisitorDb, checkedoutVisitorDb} = require('../db/admin.db');

const addVisitor = async (req, res, next) =>{
    try {
        if(!req.body.tenantID){return next(new Error("Choose tenant"));}

        if(!req.body){return next(new Error("all fields required"));}
    
        const { name, lastname, phoneNumber, tenantID, id_no, time_in, time_out, checkedout } = req.body;
        let data = {};
        data = {
            name: name ? String(name).trim() : null,
            lastname: lastname ? String(lastname).trim() : null,
            phoneNumber: phoneNumber ? String(phoneNumber) : null,
            tenantID: tenantID ? Number(tenantID) : null,
            id_no: id_no ? Number(id_no) : null,
            time_in: time_in ? String(time_in) : null,
            time_out: time_out ? String(time_out) : null,
            checkedout: checkedout ? Boolean(checkedout) : null
        }

        console.log("data",data);
        if ( !data.name || !data.lastname || !data.id_no)
            return res.status(400).json({ message: `Missing/empty field found`, ...data });


        const visitor = await addVisitorDb(data)
        return res.status(200).send(visitor);
    } catch (error) {
        next(error);
    }
}

const getALLCheckedInVisitor = async (req, res, next) =>{
    try {
        const visitors = await getALLCheckedInVisitorDb();
        return res.status(200).send(visitors);
    } catch (error) {
        next(error);
    }
}

const checkedoutVisitor = async (req, res, next)=>{
    if(!req.body){return next(new Error('Missing values!'));}

    try {
        const data = req.body;

        const visitor = await checkedoutVisitorDb(data);
        return res.status(200).send(visitor);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addVisitor, getALLCheckedInVisitor, checkedoutVisitor
}