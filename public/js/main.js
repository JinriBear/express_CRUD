const showPostWriteModalBtn = document.querySelector('#action-button-write');
const postList = document.querySelector('#post-list');

showPostWriteModalBtn.addEventListener('click', () => {
  modalBg.style.display = "block"
  writeFormContainer.style.display = "block";
})

postList.addEventListener('click', (e) => {
  const postId = e.target.dataset.postId;

  fetch(`http://localhost:3000/posts/${postId}`)
  .then(response => response.json())
  .then(result => {
    postDetailContainer.children['post-detail-title'].innerText = result.title;
    postDetailContainer.children['post-detail-name'].innerText = result.name;
    postDetailContainer.children['post-detail-content'].innerText = result.content;
  });

  modalBg.style.display = "block";
})