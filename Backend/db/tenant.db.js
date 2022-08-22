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

const getTenantById = async (id) => {
    const {rows: tenant} = await pool.query(`select * from users, tenant 
    where users.ID = tenant.userID
    AND tenant.ID = $1`,[id]);

    console.log(tenant[0]);
    return tenant[0]
};

module.exports = {
    createTenantDb,
    getAllTenantsDb,
    getTenantById
}