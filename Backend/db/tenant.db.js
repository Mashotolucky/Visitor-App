const {pool} = require("../config/dbconfig");

const createTenantDb = async ({userID,building,rank, time_in, time_out, checkedin}) =>{

    try {
        const tenant = await pool.query(
            `INSERT INTO tenant(userID, building, rank, time_in, time_out, checkedin)
             VALUES($1, $2, $3, $4, $5, $6)
             RETURNING userID, rank, time_in, time_out, checkedin`,
             [userID, building, rank, time_in, time_out, checkedin]
        );
        const mytenant = tenant.rows[0];
        console.log(mytenant);
        return mytenant;
    } catch (error) {
        throw error;
    }
};

// const checkedinDb = async ({time_in, checkedin, stuff_no}) =>{
//     try {
//         const tenants = await pool.query(
//             `UPDATE tenant
//              SET time_in = $1, checkedin = $2
//              WHERE (SELECT users.stuff_no
//                     FROM users, tenant
//                     WHERE users.id = tenant.userid
//                     AND users.stuff_no = $3) = $3
//              RETURNING *`,[time_in, checkedin, stuff_no]  
//         );
//         const tenant = tenants.rows[0];
//         console.log(tenant);

//         return tenant;
//     } catch (error) {
//         throw error;
//     }
// }

const checkedinDb = async ({time_in, checkedin, userid}) =>{
    try {
        const tenants = await pool.query(
            `UPDATE tenant
             SET time_in = $1, checkedin = $2
             WHERE userid = $3
             RETURNING *`,[time_in, checkedin, userid]  
        );
        const tenant = tenants.rows[0];
        console.log(tenant);

        return tenant;
    } catch (error) {
        throw error;
    }
}

// const checkedoutDb = async ({time_out, checkedin, stuff_no}) =>{
//     try {
//         const tenants = await pool.query(
//             `UPDATE tenant
//              SET time_out = $1, checkedin = $2
//              WHERE (SELECT users.stuff_no
//                     FROM users, tenant
//                     WHERE users.id = tenant.userid
//                     AND users.stuff_no = $3) = $3
//              RETURNING *`,[time_out, checkedin, stuff_no]  
//         );
//         const tenant = tenants.rows[0];
//         console.log(tenant);

//         return tenant;
//     } catch (error) {
//         throw error;
//     }
// }

const checkedoutDb = async ({time_out, checkedin, userid}) =>{
    try {
        const tenants = await pool.query(
            `UPDATE tenant
             SET time_out = $1, checkedin = $2
             WHERE userid = $3
             RETURNING *`,[time_out, checkedin, userid]  
        );
        const tenant = tenants.rows[0];
        console.log(tenant);

        return tenant;
    } catch (error) {
        throw error;
    }
}

const getAllTenantsDb = async () =>{
    try {
        const tenants = await pool.query(
            "select * from users, tenant where users.ID = tenant.userID ORDER BY users.name"  
        );
        const allTenants = tenants.rows;
        console.log(allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getTenantsCheckedInDb = async () =>{
    try {
        const tenants = await pool.query(
            `select * from users, tenant 
             where users.ID = tenant.userID 
             AND tenant.checkedin = true 
             ORDER BY users.name` 
        );
        const allTenants = tenants.rows;
        console.log(allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getTenantById = async (id) => {
    const {rows: tenant} = await pool.query(`select * from users, tenant 
    where users.ID = tenant.userID
    AND tenant.ID = $1`,[id]);

    console.log(tenant[0]);
    return tenant[0]
};

const searchTenantsDb = async (name) =>{
    try {
        const tenants = await pool.query(
           `select * from users, tenant 
            where users.ID = tenant.userID 
            AND users.stuff_no LIKE $1
            OR users.name LIKE $1
            OR users.lastname = $1
            ORDER BY users.name`,[name]
        );
        return tenants.rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTenantDb,
    getAllTenantsDb,
    getTenantsCheckedInDb,
    getTenantById,
    checkedinDb,
    checkedoutDb,
    searchTenantsDb
}