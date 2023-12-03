const response = require("../response");
const userModel = require("./../model/users");

const allUsers = async (req, res) => {
  try {
    const [data] = await userModel.allUsers();
    console.log(data);
    response.res200(data, res);
  } catch (error) {
    console.log(error)
    response.res500(null, res);
  }
};

module.exports = { allUsers };
