const {verifyUserByEmail, getAllUsers, getUserById} = require('../../services/usersServices');

module.exports = {

    
    index: async(req,res) =>{
        try {
            const users = await getAllUsers(req);
            return res.status(200).json({
                ok : true,
                data : {
                    users
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
    detail: async(req,res) =>{
        try {
            const user = await getUserById(req.params.id);

            if(!user){
                throw {
                    status : 404,
                    message : "Usuario no encontrado"
                }
            }
    
            return res.status(200).json({
                ok : true,
                data : {
                    user
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss, hubo un error"
                }
            })
        }
    },
    verifyEmail: async(req,res) =>{
        try {
            let existUser = await verifyUserByEmail(req.body.email);

            return res.status(200).json({
                ok : true,
                data : {
                    existUser
                }
            })
        } catch (error) {
            console.log(console.error());
            return res.status(error.status || 500).json({
                ok: false,
                error : {
                    status : error.status || 500,
                    message : error.message || 'Ocurrio un error'

                }
            })
        }
    }
}