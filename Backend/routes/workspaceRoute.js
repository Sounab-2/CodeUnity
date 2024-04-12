const express = require('express');
const router = express.Router();

const {
      createSoloWorkspace  
} = require('../controllers/workspaceController');

router.post('/create/solo/:userId',createSoloWorkspace);
// router.post('/login',login);
// router.get('/logout',logout);

module.exports = router;