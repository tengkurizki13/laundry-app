const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { encodedJson } = require("../helpers/webToken");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address,role = 'customer' } = req.body;
      // create new User
      let newUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address
      });
      
      // contional get
      let option = {
        attributes: {
          exclude: ["password"],
        },
    };
      // query get user has been created
      let user = await User.findByPk(newUser.id, option);
      
      // response success
      res.status(201).json(
        {
          message: "User has been created successfully",
          data: user,
        },
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // req.body
      const { email, password } = req.body;

      // validation for empty email or password
      if (!email || !password  ) throw { name: "Bad Request" };

      // query findone to db
      let user = await User.findOne({
        where: { email },
      });

      // check authentication
      if (!user) throw { name: "authentication" };

      // compore password hash
      let isvalidPass = await comparePassword(password, user.password);


      // check authentication
      if (!isvalidPass) throw { name: "authentication" };

      // make paylod for token
      let payload = {
        id: user.id,
      };

      //  make token
      payload = encodedJson(payload);

      // response success
      res.status(200).json(
        {
          message: "User has been logged in",
          data : {
            access_token: payload,
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          }
        },
      );
    } catch (error) {
    // next error to error handler
      next(error);
    }
  }
}

module.exports = UserController;
