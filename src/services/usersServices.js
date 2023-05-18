const { Association } = require('sequelize');
const db = require('../database/models');

module.exports = {
    
    getAllUsers : async (req) =>{
        try {
            const users = await db.User.findAll({
                attributes: {
                    exclude: ["pass", "addressId", "rolId"]
                }
            });

            return users

        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message,
            }
        }
    },
    getUserById : async (id) =>{
        try {

            const user = await db.User.findByPk(id,{
                include : [
                    {
                        association : "rol",
                    },
                    {
                        association : 'address',
                    }
                ]
            });
            return user

        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message,
            }
        }
    },
    verifyUserByEmail : async (email) =>{
        try {
            let user = db.findOne({
                where : {
                    email
                }
            })

            return user
        } catch (error) {
            console.log(error);
            throw {
                status : 500,
                message : error.message
            }
        }
    },
    getCountUsers : async () => {
        try {
            const totalUsers = db.User.count();
            return totalUsers;

        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message,
            }
        }
    }

}