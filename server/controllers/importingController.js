const {
    getAllRecords,
    getRecordByID,
    createNewRecord
} = require('../DAL/importingDAL');

const getAllRecord = (req, res) => {
    res.send(getAllRecords());
}
const getByID = (req, res) =>{
    res.send(getRecordByID(req.query));
}
const createRecord = (req, res) => {
    res.send(createNewRecord());
}

module.exports = {
    getAllRecord,
    getByID,
    createRecord
}