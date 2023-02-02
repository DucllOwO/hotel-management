const supabase = require("../database");

const TABLE_NAME = "position";

const loadAllPosition = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("id", { ascending: true });
  //console.log("fetch all Position data " + JSON.stringify(data));
  return { data, error };
};

const checkPositionExist = async (name) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("name", name);
  return { data, error };
};

const createPosition = async (name) => {
  const { data, error } = await checkPositionExist(name);
  if (!data[0]) {
    const { data: dataCreate, error: errorCreate } = await supabase
      .from(TABLE_NAME)
      .insert({ name: name })
      .select();
    return { data: dataCreate, error: errorCreate };
  }
  const conflictError = new Error(`Already have ${name} position`);
  conflictError.status = 409;
  return { data: null, error: conflictError };
};

const deletePosition = async (id) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
  console.log(error);
  return { error };
};

const updatePositionName = async (id, editedName) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({ name: editedName })
    .eq("id", id);
  return error;
};

module.exports = {
  loadAllPosition,
  createPosition,
  deletePosition,
  updatePositionName,
};
