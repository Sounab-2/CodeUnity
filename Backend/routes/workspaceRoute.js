const express = require('express');
const router = express.Router();

const {
      createSoloWorkspace ,createTeamWorkspace,
      joinTeam,
      showTeam,
      removeTeamMembers,
      savedWorkspace,
      languageSelector,
      saveCode,
      runCode,
      leaveWorkspace,
      saveChat,
      getChat,
      deleteWorkspace
} = require('../controllers/workspaceController');

router.post('/create/solo/:userId',createSoloWorkspace);
router.post('/create/team/:userId',createTeamWorkspace);
router.post('/join/team/:userId',joinTeam);
router.post('/language',languageSelector);
router.post('/save',saveCode);
router.post('/run',runCode);
router.post('/showTeam',showTeam);
router.post('/remove',removeTeamMembers);
router.post('/savedWorkspace',savedWorkspace);
router.delete('/deleteWorkspace/:workspaceId', deleteWorkspace);
router.post('/leaveWorkspace',leaveWorkspace);
router.post('/savechat',saveChat);
router.post('/getchat/:meetingId',getChat);
// router.post('/login',login);
// router.get('/logout',logout);

module.exports = router;