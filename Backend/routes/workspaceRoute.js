const express = require('express');
const router = express.Router();

const {
      createSoloWorkspace ,createTeamWorkspace,
      joinTeam
} = require('../controllers/workspaceController');

router.post('/create/solo/:userId',createSoloWorkspace);
router.post('/create/team/:userId',createTeamWorkspace);
router.post('/join/team/:userId',joinTeam);

// router.post('/login',login);
// router.get('/logout',logout);

module.exports = router;