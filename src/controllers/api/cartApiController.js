const { Op } = require('sequelize');
const db = require('../../database/models');

module.exports = {
  getOrderPending: async(req, res) => {
    try {
        const {id} = req.session.userLogin;
        const {} = userId
        const [order,isCreated]= await db.Order.findOne({
            where : {
                [Op.and]:[
                    {
                        userId : id || id
                    },
                    {
                        status : 'pending'
                    }
                ],
            },
            defaults: {
                userId: id
            }
        })

        res.status(isCreated ? 201 : 200).json({ ok:true, data:order })
    } catch (error) {
        console.log(console.log(error));
    }
  },
  getOrderPending: (req, res) => {},
  getOrderPending: (req, res) => {},
  getOrderPending: (req, res) => {},
  getOrderPending: (req, res) => {},
  getOrderPending: (req, res) => {},
};
