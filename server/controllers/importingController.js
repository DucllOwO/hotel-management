const {
    getAllRecord
} = require('../DAL/importingDAL');

const getAllRecord = (req, res) => {
    res.send(getAllRecord());
}
const getRecordByID = (req, res) =>{
    res.send(getRecordByID(req.query));
}
const createNewRecord = (req, res) => {
    res.send(createNewRecord());
}

module.exports = {
    getAllRecord,
    getRecordByID,
    createNewRecord
}