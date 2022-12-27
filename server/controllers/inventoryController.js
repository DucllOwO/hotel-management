const inventoryDAL = require('../DAL/inventoryDAL');
const bookingDAL = require("../DAL/bookingDAL");
const roomDAL = require('../DAL/roomDAL');
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

const getBookingByStatus = async (req, res, next) => {
    const {status} = req.query;

    if(!status) return next(BadRequestError);

    const {data: listBooking, error: getBookByStatusError} = 
        await bookingDAL.getBookingByStatus(status);
    
    const listBookingID = listBooking.map((value) => value.id)

    if(getBookByStatusError) return next(getBookByStatusError);

    const {data: listRoom, error: getUsingRoomError} = 
        await roomDAL.getUsingRoom(listBookingID);
    
        // console.log(listRoom)
    if(getUsingRoomError) return next(getUsingRoomError)

    const returnList = listRoom?.map((value) => {
        return {
            booking_id: value.booking_id,
            room_name: value.room_id.room_name,
            room_type: value.room_id.room_type_id.name,
        };
    });

    res.status(200).send(returnList);
}

module.exports = {
    getBookingByStatus
}