function getLastUpdate(platformId) {
  return fetch(`/platform/${platformId}/last-update`)
    .then(response => response.json())
    .then(json => json.lastUpdate)
    .catch(() => null);
}

export default getLastUpdate;
