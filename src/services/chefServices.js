const { Association } = require('sequelize');
const db = require('../database/models');

module.exports = {
    
    getAllChefs : async (req) =>{
        
    },
    getChefById : async (id) =>{
        
    },
    getCountChefs : async () => {
        try {
            const totalChefs = db.Chef.count();
            return totalChefs;

        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message,
            }
        }
    }

}