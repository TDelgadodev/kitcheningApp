const {getAllCourses,getCourseById} = require('../../services/coursesServices')

module.exports = {
    
    index : async (req,res) =>{
        try {
           const courses = await getAllCourses(req);
           
           return res.status(200).json({
            ok : true,
            data : {
                count,
                courses
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
    detail : async (req,res) =>{
        try {

            const course = await getCourseById(req,req.params.id);

            if(!course){
                throw {
                    status : 404,
                    message : "Curso no encontrado"
                }
            }

            return res.status(200).json({
                ok : true,
                data : {
                    course
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
    }


}