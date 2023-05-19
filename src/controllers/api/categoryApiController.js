const { getAllCategories } = require('../../services/catogoriesService');

module.exports = {
    
    index : async (req,res) =>{
        try {
           const {count,categories} = await getAllCategories(req);
           
           return res.status(200).json({
            ok : true,
            data : {
                count,
                categories
            }
           }) 
        } catch (error) {
            console.log(error);
            return res.send(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || 'Ups, ha ocurrido un error'
                }
            })
        }
    },


}