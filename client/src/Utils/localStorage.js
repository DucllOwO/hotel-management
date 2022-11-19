const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const deleteItem = (key) => {
  localStorage.removeItem(key);
};

const LocalStorage = { getItem, setItem, deleteItem };

export default LocalStorage;
