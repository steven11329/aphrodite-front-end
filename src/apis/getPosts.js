function getPost(skip = 0) {
  return Promise.allSettled([
    fetch(`/posts?skip=${skip}`)
      .then(response => response.json())
      .then(json => json.rows)
      .catch(() => []),
    new Promise(resolve => {
      setTimeout(() => {
        resolve([]);
      }, 2000);
    }),
  ]).then(([data]) => {
    if (data.value) {
      return data.value;
    }
    return [];
  });
}

export default getPost;
