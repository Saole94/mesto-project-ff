const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-31",
  headers: {
    authorization: "f8bfe0b2-de7c-4144-97b6-3b9da7aadb57",
    "Content-Type": "application/json",
  },
};

const checkResonse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка ${res.status}`);
};

const request = (endpoint, options) =>
  fetch(`${config.baseUrl}${endpoint}`, options)
    .then(checkResonse);

export const getInitialCards = () => {
  return request('/cards`', {
    headers: config.headers,
  });
};

export const getProfileData = () => {
  return request('/users/me', {
    headers: config.headers,
  });
};

export const getCards = () => {
  return request('/cards', {
    headers: config.headers,
  });
};

export const editProfile = (name, about) => {
  return request('/users/me', {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
}

export const addCard = (name, link) => {
  return request('/cards', {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}

export const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export const addLikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

export const delLikeCard = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export const changeAvatar = (url) => {
  return request('/users/me/avatar', {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: url }),
  });
}