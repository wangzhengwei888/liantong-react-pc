import { registerModel } from '../utils/common';



export function addwxuserRouter(app) {
  return (
    [
      {
        path: 'addwxuser',
        // hasNav:true,
        getComponent(nextState, cb){
          require.ensure([], (require) => {
            registerModel(app, require('../models/wxuser/adduser'));
            cb(null, require('../routes/wxuser/adduser'))
          },'AddUser');
        },
      },
    ]
  );
}
