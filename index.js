const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.render('index', {data: "Hello World"});
})

app.listen(PORT, () => {
  console.log(`Server on... http://localhost:${PORT}`);
})



