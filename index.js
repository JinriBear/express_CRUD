const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}));

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
  res.render('index', { postsList });
})

app.get('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  const findPost = postsData.find(post => post.id === postId);
  res.json({
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

app.listen(PORT, () => {
  console.log(`Server on... http://localhost:${PORT}`);
})



