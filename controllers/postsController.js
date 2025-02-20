const { ObjectId } = require("mongodb");
const { getDB } = require("../db/db.js");

const getDetailPost = async (req, res) => {
  const postId = req.params.id;
  
  try {
    const db = getDB();
    const result = await db.collection('board').findOne({ _id: new ObjectId(postId) });
    res.status(200).json({
      id: result._id.toString(),
      title: result.title,
      content: result.content,
      name: result.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createPost = async (req, res) => {
  const { title, content, name, password } = req.body
  const post = {
    title,
    content,
    name,
    password
  };

  try {
    const db = getDB();
    const result = await db.collection('board').insertOne(post);
    res.redirect('/');
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const postPassword = req.body.password;

  try {
    const db = getDB();
    const seachPost = await db.collection('board').findOne({ _id: new ObjectId(postId) });
    
    if(seachPost.password !== postPassword) {
      res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
      return;
    }

    const deletePost = await db.collection('board').deleteOne({ _id: new ObjectId(postId) });
    res.status(200).json({ message: '게시글이 삭제되었습니다.' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const checkPermission = async (req, res) => {
  const postId = req.params.id;
  const postPassword = req.body.password;

  try {
    const db = getDB();
    const seachPost = await db.collection('board').findOne({_id: new ObjectId(postId)});

    if(seachPost.password !== postPassword) {
      res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
      return;
    }

    res.status(200).json(seachPost);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const newPost = req.body

  try {
    const db = getDB();
    const result = db.collection('board').updateOne(
      {_id: new ObjectId(postId)},
      { $set: newPost}
    )

    res.redirect('/');

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getDetailPost,
  createPost,
  deletePost,
  checkPermission,
  updatePost,
}