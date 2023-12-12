const response = require("./../response");
const postingModel = require("./../model/posting");

//this for community page (all user can see)
const allPosting = async (req, res) => {
  try {
    const [data] = await postingModel.allPosting();
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const allPostingByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const [data] = await postingModel.allPostingByUser(id);
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const addPosting = async (req, res) => {
  try {
    const { id } = req.user;
    const { caption } = req.body;
    if (req.file && req.file.cloudStoragePublicUrl) {
      const img = req.file.cloudStoragePublicUrl;
      await postingModel.addPosting(id, caption, img);
      return response.res201("Success add new posting", res);
    }
    return response.res400("Image not Exist", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const updatePosting = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const [[oldData]] = await postingModel.onePosting(id);
    const caption = data.caption || oldData.caption;
    if (req.file && req.file.cloudStoragePublicUrl) {
      const img = req.file.cloudStoragePublicUrl;
      await postingModel.updatePosting(id, caption, img);
      return response.res201("Success update the posting", res);
    }
    const img = oldData.img;
    await postingModel.updatePosting(id, caption, img);
    return response.res201("Success update the posting", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const deletePosting = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await postingModel.deletePosting(id);
    if(!data.affectedRows){
      return response.res400("Sorry, posting is not exist", res);
    }
    return response.res200("Success delete the posting", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

module.exports = {
  allPosting,
  allPostingByUser,
  addPosting,
  updatePosting,
  deletePosting,
};
