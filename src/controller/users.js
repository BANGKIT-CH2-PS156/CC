const response = require("./../response");
const userModel = require("./../model/users");

const allUsers = async (req, res) => {
  try {
    const [data] = await userModel.allUsers();
    console.log(data);
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500(null, res);
  }
};

const testUpload = (req, res) => {
  const data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
  }

  response.res201(data, res);
};

module.exports = { allUsers, testUpload };
