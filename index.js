const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}));

const postData = [
  {
    title: "테스트 제목1",
    content: "테스트 내용1",
    name: "비회원"
  },
  {
    title: "테스트 제목2",
    content: "테스트 내용2",
    name: "비회원"
  }
];

app.get('/', (req, res) => {
  res.render('index', { postData });
})

app.post('/post', (req, res) => {
  postData.push(req.body);
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`Server on... http://localhost:${PORT}`);
})



