const db = require('../database/models');
const {literalQueryUrlImage, literalQueryUrl} = require('../helpers')

module.exports = {
    
    getAllCourses : async (req)=>{
        try {

            const courses = await db.Course.findAll({
                include : [
                    {
                        association : "images",
                        attributes : {
                            exclude : ['courseId','createdAt','updatedAt'],
                            include : [
                                literalQueryUrlImage(req,'courses','name','urlImage')
                            ]
                        }
                    }
                ],
                attributes : {
                    include : [
                        literalQueryUrl(req,'courses','Course.id')
                    ]
                }
            });
            return courses

        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message,
            }
        }
    },
    getCourseById : async (req,id)=>{
        try {

            const course = await db.Course.findByPk(id,{
                include : [
                    {
                        association : "images",
                        attributes : {
                            exclude : ['id','courseId','createdAt','updatedAt'],
                            include : [
                                literalQueryUrlImage(req,'courses','images.name','urlImage')
                            ]
                        }
                    },
                    {
                        association : 'chef',
                        attributes : {
                            exclude : ["createdAt","updatedAt","id","photo"],
                            include : [
                                literalQueryUrlImage(req,'chefs','photo','urlImage')
                            ]
                        }
                    }
                ]
            });
            return course

        } catch (error) {
            console.log(error)
            throw {
                status : 500,
                message : error.message,
            }
        }
    }


}