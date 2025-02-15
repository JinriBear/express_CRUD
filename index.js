const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const methodOverride = require('method-override')
const URL = process.env.SERVER_URL
const PORT = process.env.PORT || 3000;

const postsRouter = require('./routes/posts.js');
const postsController = require('./controllers/postsController.js');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());
app.use(methodOverride('_method'))



app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  const postsList = postsController.postsData.map(post => {
    return {
      id: post.id,
      title: post.title,
      name: post.name,
    }
  });
  res.render('index', { postsList, URL });
})

app.listen(PORT, () => {
  console.log(`Server on... http://localhost:${PORT}`);
})



