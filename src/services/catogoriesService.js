const db = require("../database/models");

module.exports = {
  getAllCategories: async () => {
    try {
      const { count, rows: categories } = await db.Category.findAndCountAll({
        attributes : {
          exclude : ['createdAt','updatedAt','imagen','id']
        }
      });
      
      return {
        categories,
        count,
      };

    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
};
