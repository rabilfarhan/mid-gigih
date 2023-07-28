const { default: mongoose } = require('mongoose');
const ComentModel = require('../models/ComentModel');
const VideoModels = require('../models/VideoModels');

const addComment = async (data) => {
  const { videoId } = data;
  try {
    // Cari video berdasarkan videoId
    const video = await VideoModels.findById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }

    // Buat komentar baru
    const comment = await ComentModel.create({
      username: data.username,
      comment: data.comment,
      createdAt: new Date(),
      video: videoId, // Hubungkan komentar dengan video menggunakan videoId
    });

    // Tambahkan komentar ke array comments pada video
    video.comments.push(comment._id);
    await video.save();

    return comment;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getComment = async () => {
  try {
    const response = await ComentModel.find();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCommentByVideoId = async (videoId) => {
  try {
    const response = await ComentModel.find({
      video: new mongoose.Types.ObjectId(videoId),
    });
    console.log('Response ', response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  addComment,
  getComment,
  getCommentByVideoId,
};
