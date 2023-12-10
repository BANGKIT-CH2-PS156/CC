const response = require("./../response");
const userModel = require("./../model/users");

const allUsers = async (req, res) => {
  try {
    // const  {id,email,emailEncrypt} = req.user; //data from auth middleware
    // console.log(emailEncrypt)
    const [data] = await userModel.allUsers();
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};
// const updateUsers
const updateUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = req.body;
    const [[oldData]] = await userModel.oneUser(email);
    //set default value if only have little change
    const name = user.name || oldData.name;
    const job = user.job || oldData.job;
    const address = user.address || oldData.address;
    const phone = user.phone || oldData.phone;

    if (req.file && req.file.cloudStoragePublicUrl) {
      const img = req.file.cloudStoragePublicUrl;
      await userModel.updateUser(email, name, job, address, phone, img);
      return response.res201("Updated successfully", res);
    }
    const img = oldData.img;
    await userModel.updateUser(email, name, job, address, phone, img);
    return response.res201("Updated successfully", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const testUpload = (req, res) => {
  const data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl;
    return response.res201(data, res);
  }
  return response.res400("Image is not exist", res);
};

module.exports = { allUsers, testUpload, updateUser };
