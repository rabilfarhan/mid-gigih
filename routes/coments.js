const { default: mongoose } = require('mongoose');
const Format = require('response-format');
const { Router } = require('express');
const {
  addComment,
  getComment,
  getCommentByVideoId,
} = require('../controller/ComentController');
const { authenticateToken } = require('../middleware/AuthMiddleware');

const router = Router();

router.get('/', async (_, res) => {
  try {
    const response = await getComment();
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(500).send(Format.internalError('error', error.message));
  }
});
router.get('/video/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getCommentByVideoId(id);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(404).send(Format.notFound('error', error.message));
  }
});
router.post('/', authenticateToken, async (req, res) => {
  const { comment, videoId } = req.body;
  try {
    if (!comment || !videoId) {
      return res
        .status(400)
        .send(
          Format.badRequest('error', 'username, comment, videoId is required')
        );
    }
    const createdAt = new Date().toLocaleDateString();
    const data = { username: req.user.username, comment, createdAt, videoId };
    const response = await addComment(data);
    res.status(200).send(Format.success('success', response));
  } catch (error) {
    res.status(500).send(Format.internalError('error', error.message));
  }
});

module.exports = router;
