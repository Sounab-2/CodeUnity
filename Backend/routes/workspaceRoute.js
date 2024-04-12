const express = require('express');
const router = express.Router();

const {
      createSoloWorkspace ,createTeamWorkspace
} = require('../controllers/workspaceController');

router.post('/create/solo/:userId',createSoloWorkspace);
router.post('/create/team/:userId',createTeamWorkspace);

// router.post('/login',login);
// router.get('/logout',logout);

module.exports = router;