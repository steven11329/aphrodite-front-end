function getPost(id) {
  return fetch(`/post/${id}`)
    .then(response => response.json())
    .catch(() => []);
}

export default getPost;
