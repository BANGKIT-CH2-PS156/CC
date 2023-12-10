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
      const imgUrl = req.file.cloudStoragePublicUrl;
      const img = "https://cdn.discordapp.com/attachments/1170360157256040448/1182592232788856832/00000451.jpg?ex=658541d7&is=6572ccd7&hm=d51410738bba8f5ea111731508050f9ac825764cd45c46aa10a256b12642de32&";
      console.log(id);
      console.log(imgUrl);
      console.log(img);
      //use axioo to request data from endpoint model (flask)
      const predict = await axios.post("http://localhost:8080/predict", { image: `${img}` });
      // const resPredict = predict
      console.log(predict.data);
      return response.res200(predict.data.data, res);
      // await predictModel.addPredict(id, img, info);
    }
    return response.res400("Image is not Exist", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

module.exports = { allPredict, addPredict };
