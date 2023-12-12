const axios = require("axios");
const response = require("./../response");
const predictModel = require("./../model/predict");

const allPredict = async (req, res) => {
  try {
    const { id } = req.user;
    const [data] = await predictModel.allPredict(id);
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const addPredict = async (req, res) => {
  try {
    const { id } = req.user;

    if (req.file && req.file.cloudStoragePublicUrl) {
      const img = req.file.cloudStoragePublicUrl;
      //use axioo to request data from endpoint model (flask)
      const {data} = await axios.post(process.env.ENDPOINT_PREDICT, {
        image: `${img}`,
      });
      const info = data.data.soil_types_prediction;
      await predictModel.addPredict(id, img, info);
      return response.res200(data.data, res);
    }
    return response.res400("Image is not Exist", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

module.exports = { allPredict, addPredict };
