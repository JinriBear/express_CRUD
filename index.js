const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
var methodOverride = require('method-override')
const URL = process.env.SERVER_URL
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'))

const postsData = [
  {
    id: 1,
    title: "테스트 제목1",
    content: "테스트 내용1",
    name: "비회원",
    password: "1234"
  },
  {
    id: 2,
    title: "테스트 제목2",
    content: "테스트 내용2",
    name: "비회원",
    password: "1234"
  }
];

let id = 3;

app.get('/', (req, res) => {
  const postsList = postsData.map(post => {
    return {
      id: post.id,
      title: post.title,
      name: post.name,
    }
  });
  res.render('index', { postsList, URL });
})

app.get('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const findPost = postsData.find(post => post.id === postId);
  res.json({
    id: findPost.id,
    title: findPost.title,
    content: findPost.content,
    name: findPost.name
  });
})

app.post('/posts', (req, res) => {
  const { title, content, name, password } = req.body
  const post = {
    id,
    title,
    content,
    name,
    password
  };

  postsData.push(post);
  id++;
  res.redirect('/');
})

app.delete('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const postPassword = req.body.password;
  const searchPost = postsData.find(post => post.id === postId);
  const searchPostIndex = postsData.findIndex(post => post.id === postId);

  if(searchPost.password !== postPassword) {
    res.status(401).json({ message: '비밀번호가 틀렸습니다.'});
    return;
  };
  
  postsData.splice(searchPostIndex, 1);
  res.json({ message: '게시글이 삭제되었습니다.' });
})

app.post('/posts/:id/check-permission', (req, res) => {
  const postId = Number(req.params.id);
  const postPassword = req.body.password;
  const searchPost = postsData.find(post => post.id === postId);

  if(searchPost.password !== postPassword) {
    res.status(401).json({ message: '비밀번호가 틀렸습니다.'});
    return;
  };

  res.json(searchPost);
})

app.put('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const newPost = req.body
  
  postsData.forEach((post) => {
    if(post.id === postId){
      post.title = newPost.title;
      post.content = newPost.content;
      post.name = newPost.name;
      post.password = newPost.password;
    }
  });
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`Server on... http://localhost:${PORT}`);
})



