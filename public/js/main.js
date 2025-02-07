const showPostWriteModalBtn = document.querySelector('#action-button-write');
const postList = document.querySelector('#post-list');

showPostWriteModalBtn.addEventListener('click', () => {
  modalBg.style.display = 'block'
  writeFormContainer.style.display = 'block';
})

postList.addEventListener('click', async (e) => {
  const postId = e.target.dataset.postId;
  modalBg.style.display = 'block';
  modalPostDetail.style.display = 'block';

  const result = await fetch(`${SERVER_URL}/posts/${postId}`).then(res => res.json());
  
  postDetailContainer.children['post-detail-title'].dataset.id = result.id;
  postDetailContainer.children['post-detail-title'].innerText = result.title;
  postDetailContainer.children['post-detail-name'].innerText = result.name;
  postDetailContainer.children['post-detail-content'].innerText = result.content;
})