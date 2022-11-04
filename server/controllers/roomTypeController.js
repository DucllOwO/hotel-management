const{
    getAllTypes,
    getTypeByID,
    createRoomType,
    updateRoomType
} = require('../DAL/roomTypeDAL')

const getAll = (req, res) => {
    res.send(getAllTypes());
};
const getByID = (req, res) => {
    res.send(getTypeByID(req.query));
};
const createType = (req, res) => {
    res.send(createRoomType(req.body));
};
const updateInformation = (req, res) => {
    res.send(updateRoomType(req.query, req.body));
};

module.exports = {
    getAll,
    getByID,
    createType,
    updateInformation,
}