const { default: mongoose } = require('mongoose');
const { YouTubeGetID } = require('../helpers');
const ProductModels = require('../models/ProductModels');
const VideoModels = require('../models/VideoModels');

const getAllVideo = async () => {
  // Ambil semua video
  const videos = await VideoModels.find();

  // Populasi detail produk pada array products dari setiap video
  const populatedVideos = await VideoModels.find();

  return populatedVideos;
};
const getDetailVideo = async (id) => {
  try {
    const response = await VideoModels.findById(id);
    const populateVideo = await VideoModels.populate(response, [
      {
        path: 'products',
        select: 'name price image productUrl -_id',
      },
      {
        path: 'comments',
        select: 'username comment createdAt -_id',
      },
    ]);
    return populateVideo;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addVideo = async (title, video, productIds) => {
  try {
    // Cek apakah productIds valid dan sesuai dengan ObjectId
    const isValidProductIds = productIds.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (!isValidProductIds) {
      throw new Error('Invalid productIds');
    }

    // Cari produk berdasarkan productIds
    const products = await ProductModels.find({ _id: { $in: productIds } });

    // Buat video baru beserta assign produk
    const thumbnail = YouTubeGetID(video);
    const videoData = {
      title,
      videoUrl: video,
      thumbnailUrl: `https://img.youtube.com/vi/${thumbnail}/hqdefault.jpg`,
      products: products.map((product) => product._id),
    };

    const newVideo = await VideoModels.create(videoData);
    return newVideo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const editVideo = async (id, title, videoUrl) => {
  try {
    if (!videoUrl) {
      const { options } = { new: true };
      const res = await VideoModels.findByIdAndUpdate(
        id,
        {
          title,
        },
        options
      );
      return res;
    }
    const thumbnail = YouTubeGetID(videoUrl);
    const { options } = { new: true };
    const res = await VideoModels.findByIdAndUpdate(
      id,
      {
        thumbnailUrl: `https://img.youtube.com/vi/${thumbnail}/hqdefault.jpg`,
        title,
        videoUrl,
      },
      options
    );
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteVideo = async (id) => {
  try {
    const res = await VideoModels.findByIdAndDelete(id);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  getAllVideo,
  addVideo,
  editVideo,
  deleteVideo,
  getDetailVideo,
};
