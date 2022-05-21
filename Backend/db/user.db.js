const {pool} = require("../config/dbconfig");

const getAllUsersDb = async () =>{
    const {rows: users} = await pool.query(
        "select * from users"
    );
    return users;
}

const getUserByIdDb= async (id) => {
    const {rows: user} = await pool.query(
        "select * from users where ID = $1",
        [id]
    );
    return user[0];
};

const getuserByTenantIdDb = async (id) =>{
    const {rows: user} = await pool.query(
        `select * from users, tenant
        where users.ID = tenant.userID
        and tenant.ID = $1`, [id]
    );
    return user[0];
};

const getuserByAdminIdDb = async (id) =>{
    const {rows: user} = await pool.query(
        `select * from users, admin
        where users.ID = admin.userID
        and admin.ID = $1`, [id]
    );
    return user[0];
};

const getUserByEmailDb = async (email) => {
    const {rows: exists} = await pool.query(
        "select * from users where lower(email) = lower($1)",
        [email]
    );
    return exists? exists[0]: false;
}

const changeUserPasswordDb = async (hashedPassword, email) =>{
    return await pool.query(
        "update users set password = $1 where email = $2",
        [hashedPassword, email]
    );
};

const createUserDb = async ({name,password, email, lastname, role}) =>{
    try {
        const user = await pool.query(
            `INSERT INTO users(name, password, email,lastname,role)
             VALUES($1, $2, $3, $4, $5)
             RETURNING ID, name, lastname, email, role, created_at`,
             [name, password, email, lastname, role]
        );
        const myuser = user.rows[0];
        console.log(myuser);
        return myuser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    getAllUsersDb,
    getUserByIdDb,
    getuserByTenantIdDb,
    getuserByAdminIdDb,
    getUserByEmailDb,
    changeUserPasswordDb,
    createUserDb
}
