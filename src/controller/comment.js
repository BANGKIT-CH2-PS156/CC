const response = require("./../response");
const commentModel = require("./../model/comment");

const commentByPost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const [data] = await commentModel.commentByPost(idPost);
    response.res200(data, res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const addComment = async (req, res) => {
  try {
    const { idPost } = req.params;
    const idUser = req.user.id;
    const { text } = req.body;
    if (!text) {
      return response.res400("Please type your comment before sending", res);
    }
    await commentModel.addComment(idPost, idUser, text);
    response.res200Msg("Success give comment", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await commentModel.deleteComment(id);
    if (!data.affectedRows) {
      return response.res400("Sorry comment is not exist", res);
    }
    return response.res200Msg("Success delete comment", res);
  } catch (error) {
    console.log(error);
    response.res500(res);
  }
};

module.exports = { commentByPost, addComment, deleteComment };
