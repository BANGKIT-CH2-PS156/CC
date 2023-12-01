const response = require("../response");
const userModel = require("./../model/users");

const allUsers = async (req, res) => {
  try {
    const [data] = await userModel.allUsers();
    console.log(data)
    response(200, "Response Success", data, res);
  } catch (error) {
    response(500, "Internal Server Error", error, res);
  }
};

module.exports = { allUsers };
