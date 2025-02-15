const express = require('express');
const router = express.Router();
const postContorller = require('../controllers/postsController.js');

// 디테일 페이지 조회
router.get('/:id', postContorller.getDetailPost);

// 게시글 작성
router.post('/', postContorller.createPost);

// 게시글 삭제
router.delete('/:id', postContorller.deletePost);

// 게시글 패스워드 확인 후 수정을 위한 정보 전송
router.post('/:id/check-permission', postContorller.checkPermission);

// 게시글 수정
router.put('/:id', postContorller.updatePost);

module.exports = router;