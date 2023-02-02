const serviceDAL = require('../DAL/serviceDAL');
const { BadRequestError } = require('../middlewares/errorHandler')

const getAll = (req, res, next) => {
    const {data, error} = serviceDAL.getAllService();
    if(error) 
        return next(error);
    res.status(200).send(data);
}

const createService = (req, res, next) => {
    const {service} = req.body;

    if(!service) 
        return BadRequestError();

    const {data, error: insertServiceError} = serviceDAL.createNewService(service);
    
    if(insertServiceError) 
        return next(insertServiceError);

    res.status(201).send("Created");
}

const updateService = (req, res, next) => {
    const {service} = req.body;

    if(!service) 
        return BadRequestError();

    const {data, error: insertServiceError} = serviceDAL.updateService(service);
    
    if(insertServiceError) 
        return next(insertServiceError);

    res.status(201).send("Created");
}

module.exports = {
    getAll,
    createService,
    updateService
}