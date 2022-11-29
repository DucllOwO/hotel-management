const supabase = require("../database");

const getAllUser = () => {
  return supabase.auth.api.listUsers();
};

const updateUserById = (id, user) => {
  return supabase.auth.api.updateUserById(id, user);
};

const createUser = (user) => {
  return supabase.auth.api.createUser({
    ...user,
  });
};

const deleteUser = (id) => {
  return supabase.auth.api.deleteUser(id);
};

module.exports = { getAllUser, updateUserById, createUser, deleteUser };
