const { getAllBranches, getBranch, createBranch, updateBranch, deleteBranch } = require('../controllers/branchController')
const { verifyAdmin } = require('../middlewares/verify')
const router = require("express").Router();

// customer can get branch
router.get('/', getAllBranches);

router.get('/:id', getBranch);

router.post('/', verifyAdmin, createBranch);

router.put('/:id', verifyAdmin, updateBranch);

// actually hide branch
router.delete('/:id', verifyAdmin, deleteBranch);

module.exports = router;

