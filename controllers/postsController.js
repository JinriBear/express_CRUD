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

const getDetailPost = (req, res) => {
  const postId = Number(req.params.id);
  const findPost = postsData.find(post => post.id === postId);
  res.status(200).json({
    id: findPost.id,
    title: findPost.title,
    content: findPost.content,
    name: findPost.name
  });
}

const createPost = (req, res) => {
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
}

const deletePost = (req, res) => {
  const postId = Number(req.params.id);
  const postPassword = req.body.password;
  const searchPost = postsData.find(post => post.id === postId);
  const searchPostIndex = postsData.findIndex(post => post.id === postId);

  if(searchPost.password !== postPassword) {
    res.status(401).json({ message: '비밀번호가 틀렸습니다.'});
    return;
  };
  
  postsData.splice(searchPostIndex, 1);
  res.status(200).json({ message: '게시글이 삭제되었습니다.' });
}

const checkPermission = (req, res) => {
  const postId = Number(req.params.id);
  const postPassword = req.body.password;
  const searchPost = postsData.find(post => post.id === postId);

  if(searchPost.password !== postPassword) {
    res.status(401).json({ message: '비밀번호가 틀렸습니다.'});
    return;
  };

  res.status(200).json( searchPost );
}

const updatePost = (req, res) => {
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
}

module.exports = {
  postsData,
  getDetailPost,
  createPost,
  deletePost,
  updatePost,
}