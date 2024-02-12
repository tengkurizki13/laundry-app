const { Request,User,Track } = require("../models");

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
    try {
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

  static async requestAdd(req, res, next) {
    try {
      const {
        scale,
        price,
        userId
      } = req.body;
      

      let newRequest = await Request.create({
        scale,
        price,
        userId
      });

      let idRequest = Number(newRequest.id)
      let idPelanggan = Number(userId)

      await Track.create({
        userId : idPelanggan,
        requestId : idRequest,
        status: "proses"
      });


         let request = await Request.findByPk(idRequest);
      
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
        scale,
        price,
        status,
        userId,
      } = req.body;

      let request = await Request.findByPk(id);

      if (!request) throw { name: "notFound" };

      let option = {
            where: { id }
      };

      await Request.update({
        scale,
        price,
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

      console.log("sampai sini");

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

      let request = await Request.findByPk(id,option);

      if (!request) throw { name: "notFound" };

      let option2 = {
            where: { id }
      };

      await Request.update({
        status,
      },option2);

      await Track.create({
        userId: request.User.id,
        requestId : request.id,
        status
      },option);


      res.status(200).json({
        massage: `request status success to update`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = RequestController;
