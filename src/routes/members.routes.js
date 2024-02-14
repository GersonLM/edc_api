import express from 'express';

import * as membersCtrl from '../controllers/members.controller';

const routes  = express.Router();


routes.post('/newMember',[],membersCtrl.newMember);

routes.get('/getMembers',[],membersCtrl.getMembers);

export default routes;