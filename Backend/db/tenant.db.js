const {pool} = require("../config/dbconfig");

const createTenantDb = async ({userID,building,officeNo}) =>{

    try {
        const tenant = await pool.query(
            `INSERT INTO tenant(userID, building, officeno)
             VALUES($1, $2, $3)
             RETURNING userID, building, officeno`,
             [userID, building, officeNo]
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
        const allTenants = tenants.rows[0];
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