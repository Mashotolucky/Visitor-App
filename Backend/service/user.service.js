const {roles} = require('../helpers/constant');
const {hashPassword, comparePassword} = require('../helpers/password');
const {generateToken} = require('../middleware/jwt');
const signupMail = require('../helpers/mailer');

const {
    getUserByEmailDb, 
    createUserDb, 
    changeUserPasswordDb, 
    getAllUsersDb, 
    getUserByIdDb} = require('../db/user.db');

const {createTenantDb, getAllTenantsDb, getTenantById} = require('../db/tenant.db');
const {createAdminDb, getAdminById, getAllAdminsDb} = require('../db/admin.db');


class USerService {
    
    createUser = async (my_user) => {
        try {
            
            //check if user exists
            const existing_user = await getUserByEmailDb(my_user.email);

            //if exist 
            if(existing_user) {throw Error("Email taken");}

            //encrypt/ hash password
            const hashedPassword = await hashPassword(my_user.password);

            const user = {
                ...my_user,
                password: hashedPassword
            };

            const email = {
                name: my_user.lastname,
                
            }
  
            //create user
            
            const newuser = await createUserDb(user);
            console.log('user service',newuser);
            //check user role and create TENANT OR ADMIN
            if(newuser.role && newuser.role.toUpperCase() == roles.TENANT){
                const tenant = await createTenantDb({userID: newuser.id, building: user.building, rank: user.rank, staff_no: user.staff_no, id_no: user.id_no});
                return tenant;
            }
            else
            if(newuser.role && newuser.role.toUpperCase() == roles.ADMIN){
                const admin = await createAdminDb({userID: newuser.id});
                return admin;
            }
            else{
                throw Error("Role is Empty or Not Defined");
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    login = async ({email, password}) =>{
        //find user if exists
        const user = await getUserByEmailDb(email);

        //if user not fount 
        if(!user) {throw Error("User not found check email and password");}

        //call function to compare hash with plain user input(password);
        const result = await comparePassword(password, user.password);

        if(result){
            //create token
            const token = await generateToken({userId: user.id, userRole: user.role});
            return {user: user,token};
        }
        else{
            throw new Error("Password do not match");
        }
    };
}

module.exports = new USerService();