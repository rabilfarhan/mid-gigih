const { Router } = require('express');
const {
  getAllVideo,
  addVideo,
  editVideo,
  deleteVideo,
  getDetailVideo,
} = require('../controller/VideoController');
const Format = require('response-format');

const router = Router();

router.get('/', async (req, res) => {
  const response = await getAllVideo();
  res.status(200).send(Format.success('success', response));
});

router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getDetailVideo(id);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(404).send(Format.notFound(error.message));
  }
});

router.post('/', async (req, res) => {
  const { title, videoUrl, productIds } = req.body;

  try {
    if (!title || !videoUrl) {
      return res
        .status(400)
        .send(Format.badRequest('error', 'title or videoUrl is required'));
    }
    const response = await addVideo(title, videoUrl, productIds);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(500).send(Format.badRequest('error', error.message));
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, videoUrl } = req.body;
  try {
    const response = await editVideo(id, title, videoUrl);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(400).send(Format.badRequest('error', error.message));
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteVideo(id);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(400).send(Format.badRequest('error', 'Video not found'));
  }
});
module.exports = router;
