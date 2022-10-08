

const router = require("express").Router();

// route to manage employee, report of specific branch

router.use('/')

// customer can get branch 
router.get('/', verifyToken, getAllBranches);

router.get('/:id', verifyToken, getBranch);

router.post('/', verifyAdmin, createBranch);

router.put('/:id', verifyAdmin, updateBranch);

// actually hide branch
router.delete('/:id', verifyAdmin, deleteBranch);

