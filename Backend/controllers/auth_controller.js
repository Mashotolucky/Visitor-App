const USerService = require('../service/user.service');
const { roles } = require('../helpers/constant');
const userService = require('../service/user.service');

const login = async (req, res, next) => {
    try {
        if (!(req.body && req.body.email && req.body.password))
            return res.status(400).json({ message: `Fill in all fields`, ...req.body })

        const loggedin = await userService.login(req.body);

        res.setHeader('Authorization', 'Baerer' + loggedin.token);
        res.cookie('access_token',loggedin.token, { path: '/', secure: true, sameSite: "strict" })
        return res.status(200).send(loggedin);
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    if (!req.body)
        return next(new Error("All fields required"));

    const { name, password, email, lastname, role, building, officeNo, adminID } = req.body;
    let data = {};
    data = {
        name: name ? String(name).trim() : null,
        password: password ? String(password).trim() : null,
        email: email ? String(email).trim() : null,
        lastname: lastname ? String(lastname).trim() : null,
        building: building ? String(building).trim() : null,
        officeNo: officeNo ? Number(officeNo) : null,
        adminID: adminID ? Number(adminID) : null,
        role: role
    }

    try {
        if (!data) return next(new Error("all fields required"));

        if (!data.role || !data.name || !data.password || !data.email || !data.lastname)
            return res.status(400).json({ message: `Missing/empty field found`, ...data });

        const user = await USerService.createUser(data);

        if(!user) return res.status(500).send("Something went wrong");

        return res.status(200).send(user);
    }catch(error){
        next(error);
    }

    
}

module.exports = {
    login, register
}