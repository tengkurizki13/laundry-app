const { Request,User } = require("../models");

class RequestController {
  static async requests(req, res, next) {
    try {

      let option = {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
        order: [["id", "ASC"]],
      };


      let requests = await Request.findAll(option);


      res.status(200).json({
        message: "all request",
        data: requests,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async requestById(req, res, next) {
    const { id } = req.params;
    let option = {
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    };
    try {
      let request = await Request.findByPk(id, option);

      if (!request) throw { name: "notFound" };

      res.status(200).json({
        message: "detail request",
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userRequests(req, res, next) {
    
    try {
      let option = {
        include: [
          {
            model: Request,
            where: { userId : req.user.id }
          },
        ],
        attributes: {
          exclude: ["password"],
        },
      };


      let userRequest = await User.findAll(option);

      if (!userRequest) throw { name: "notFound" };

      res.status(200).json({
        message: "detail userRequest",
        data: userRequest,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async requestAdd(req, res, next) {
    try {
      const {
        item,
        price,
        scale,
        status,
        userId = req.user.id,
      } = req.body;
      

      let newRequest = await Request.create({
        item,
        price,
        scale,
        status,
        userId
      });


         let request = await Request.findByPk(newRequest.id);
      
         res.status(201).json(
           {
             message: "Request has been created successfully",
             data: request,
           },
         );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async requestDelete(req, res, next) {
    try {
      const { id } = req.params;

      let request = await Request.findByPk(id);

      if (!request) throw { name: "notFound" };

      await request.destroy({ where: { id } });

      res.status(200).json(
        {
          massage: `request with id ${request.id} success to delete`,
        },
      );
    } catch (error) {
      next(error);
    }
  }

  static async requestUpdate(req, res, next) {
    try {
      const { id } = req.params;

      const {
        item,
        price,
        scale,
        status,
        userId = req.user.id,
      } = req.body;

      let request = await Request.findByPk(id);

      if (!request) throw { name: "notFound" };

      let option = {
            where: { id }
      };

      await Request.update({
        item,
        price,
        scale,
        status,
        userId
      },option);

      res.status(200).json({
        massage: `request success to update`,
      });
    } catch (error) {
      next(error);
    }
  }


  static async requestStatusUpdate(req, res, next) {
    try {
      const { id } = req.params;

      const {
        status,
      } = req.body;

      let request = await Request.findByPk(id);

      if (!request) throw { name: "notFound" };

      let option = {
            where: { id }
      };

      await Request.update({
        status,
      },option);



      res.status(200).json({
        massage: `request status success to update`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RequestController;