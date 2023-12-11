const response = require("./../response");
const chatModel = require("./../model/chat");

const chatBox = async (req, res) => {
  try {
    const idSender = req.user.id;
    const { idReceiver } = req.params;
    const [data] = await chatModel.chatBox(idSender, idReceiver);
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const addChat = async (req, res) => {
  try {
    const idSender = req.user.id;
    const { idReceiver } = req.params;
    const { message } = req.body;
    if (!message) {
      return response.res400("Please type message before sending", res);
    }
    await chatModel.addChat(idSender, idReceiver, message);
    response.res201("Success sending message", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

module.exports = { chatBox, addChat };
