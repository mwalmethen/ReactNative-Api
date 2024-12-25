import instance from "./index";

async function getAllPosts() {
  const response = await instance.get(
    "https://api-creddit.eapi.joincoded.com/posts"
  );
  return response;
}
async function getPostById(id) {
  const response = await instance.get(
    `https://api-creddit.eapi.joincoded.com/posts/${id}`
  );
  console.log(response);
  return response;
}
async function addPost(data) {
  const response = await instance.post(
    "https://api-creddit.eapi.joincoded.com/posts",
    data
  );
  console.log("addPost", response);
  return response;
}
async function deletePost(id) {
  const response = await instance.delete(
    `https://api-creddit.eapi.joincoded.com/posts/${id}`
  );
  console.log("deletePet", response);
  return response;
}
async function addComment(id, data) {
  const response = await instance.post(
    `https://api-creddit.eapi.joincoded.com/posts/${id}/comments`,
    data
  );
  console.log("addComment", response.data);
  return response.data;
}
async function deleteComment(commentId) {
  const response = await instance.delete(
    `https://api-creddit.eapi.joincoded.com/posts/comments/${commentId}`
  );
  console.log("deleteComment", response.data);
  return response.data;
}
export {
  getAllPosts,
  addPost,
  deletePost,
  getPostById,
  addComment,
  deleteComment,
};
