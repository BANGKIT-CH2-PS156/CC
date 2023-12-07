const response = require("./../response");
const historyModel = require("./../model/history");

const allHistory = async (req, res) => {
  try {
    const { idUser } = req.params;
    const [data] = await historyModel.allHistory(idUser);
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500("Sorry Server Error", res);
  }
};

const addHistory = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { img, info } = req.body;
    await historyModel.addHistory(idUser, img, info);
    response.res201("Success add data", res);
  } catch (error) {
    console.log(error);
    response.res500("Sorry Server Error", res);
  }
};

module.exports = { allHistory, addHistory };
