const router = require('express').Router();
const modelGenerator = require('../utils/model-generator');

let Lesson = require('../models/lesson');
let User = require('../models/user');
let Comment = require('../models/comment');

// Get All Comments
router.get('/', async (req, res) => {
  try {
    let comments = await Comment.find();

    let list = [];
    for (comment of comments) {
      let user = await User.findById(comment['_idUser']);
      let lesson = await Lesson.findById(comment['_idLesson']);

      let item = {
        _id: comment._id,
        user: user,
        lesson: lesson,
        content: comment.content,
        isDelete: comment.isDelete,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      }

      list.push(item);
    }
    res.json(list);
  } catch(e) {
    res.status(400).json('Error: ' + e);
  }
});

// Create Comment
router.post('/create', async (req, res) => {
  let { _idUser, _idLesson, content, rate } = req.body;

  try {
    let comment = await modelGenerator.createComment(
      _idUser,
      _idLesson,
      content,
      false
    );
    res.json(comment);
  } catch(e) {
    res.status(400).json("Error: " + e);
  };
});

// Update + Delete Comment
router.post('/update', async (req, res) => {
  const comment = await Comment.findOne({ _id: req.body._idComment });

  if (comment)
  {
    for (let key in req.body)
    {
      comment[key] = req.body[key];
    }
    comment
      .save()
      .then(result => res.json(result))
      .catch (err => console.log(err));
  } else {
    res.json(null);
  }
});

module.exports = router
