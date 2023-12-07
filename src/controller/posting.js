const response = require("./../response");
const postingModel = require("./../model/posting");

const allPosting = async (req, res) => {
  try {
    const [data] = await postingModel.allPosting();
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500("Sorry Server Error", res);
  }
};

const allPostingByUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const [data] = await postingModel.allPostingByUser(idUser);
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500("Sorry Server Error", res);
  }
};

const addPosting = async (req, res) => {
  try {
    const { idUser, caption, img } = req.body;
    await postingModel.addPosting(idUser, caption, img);
    response.res200("Success add new posting", res);
  } catch (error) {
    console.log(error);
    response.res500("Sorry Server Error", res);
  }
};

const updatePosting = async (req, res) => {
  try {
    const { id } = req.params;
    const { caption, img } = req.body;
    await postingModel.updatePosting(id, caption, img);
    response.res200("Success update the posting", res);
  } catch (error) {
    console.log(error);
    response.res500("Sorry Server Error", res);
  }
};

const deletePosting = async (req, res) => {
  try {
    const { id } = req.params;
    await postingModel.deletePosting(id);
    response.res200("Success delete the posting", res);
  } catch (error) {
    console.log(error);
    response.res500("Sorry Server Error", res);
  }
};

module.exports = {
  allPosting,
  allPostingByUser,
  addPosting,
  updatePosting,
  deletePosting,
};
