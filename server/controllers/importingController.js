const importingDAL = require('../DAL/importingDAL');
const employeeDAL = require('../DAL/employeeDAL')
const { BadRequestError } = require("../middlewares/errorHandler");

const getAllRecord = (req, res, next) => {
    const{data: importing, error: getImportingError} = importingDAL.getAllRecords();
    if(getImportingError) 
        return next(getImportingError);
    else
        res.status(200).send(importing);
}
const getByID = (req, res, next) =>{
    const { id: importingID } = req.params;
    const{data: importing, error: getImportingError} = importingDAL.getByID(importingID);
    if(getImportingError) 
        return next(getImportingError);
    else
        res.status(200).send(getByID(id));
}
const createRecord = (req, res, next) => {
    const {importing, item, employee} = req.body;

    if (!importing || !item || !employee) return next(BadRequestError());

    const { data: employeeTemp, error: employeeTempError } =
        await customerDAL.getCustomerByID(customer?.id);

    if (customerTempError) return next(customerTempError);

    if (!customerTemp[0]) {
        const { error: insertError } = await customerDAL.insertCustomer(customer);

        if (insertError) return next(insertError);
    }

    const { error: insertBookingError } = await bookingDAL.insertBooking({
        voucher_id: voucher?.id,
        customer_id: customer?.id,
        ...booking,
    });

    if (insertBookingError) return next(insertBookingError);

    res.status(201).send("Created");
    res.send(createNewRecord());
}

module.exports = {
    getAllRecord,
    getByID,
    createRecord
}