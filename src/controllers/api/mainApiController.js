const { getCountCourses } = require('../../services/coursesServices');
const { getCountUsers } = require('../../services/usersServices');
const { getCountChefs} = require('../../services/chefServices')

module.exports = {
    
    metrics : async (req,res) => {
        try {
            const totalCourses = await getCountCourses(req);
            const totalUsers = await getCountUsers(req);
            const totalChefs = await getCountChefs(req);

            return res.status(200).json({
                ok : true,
                data : {
                    totalCourses,
                    totalUsers,
                    totalChefs
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