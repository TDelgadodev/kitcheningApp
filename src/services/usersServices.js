const { Association } = require('sequelize');
const db = require('../database/models');

module.exports = {
    
    getAllUsers : async (req) =>{
        try {
            const users = await db.User.findAll({
                include : [
                    {
                        association : "rol",
                    },
                    {
                        association : "address",
                    }
                ],
            })

            return users
        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message,
            }
        }
    },
    getUserById : async (req,res) =>{

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

}