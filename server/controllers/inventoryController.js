const inventoryDAL = require('../DAL/inventoryDAL');
const employeeDAL = require('../DAL/employeeDAL');
const { BadRequestError } = require('../middlewares/errorHandler');

const getAll = (req, res, next) => {
    const{data, error} = inventoryDAL.getAllInventories();
    if(error)
        return next(error);
    return data;
}
const createRecord = (req, res, next) => {
    const{record, employee} = req.body;
    const{id: employeeID} = employee?.id;

    if(!employee || !record) 
        return next(BadRequestError);

    const {data, error: insertRecordError} = inventoryDAL.createNewRecord({
        employee_id: employee?.id,
        ...record,
    });
    
    if(insertRecordError)
        return next(insertRecordError);

    res.status(201).send("Created");
}
