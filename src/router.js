import React from 'react';
import { Router } from 'dva/router';
import App from './routes/app/App';
import { registerModel } from './utils/common';
import { homeRouter } from './router/homeRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { errorRouter } from './router/errorRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { myPlanRouter } from './router/myPlanRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { changePlanRouter } from './router/changePlanRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { myOrderRouter } from './router/myOrderRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { helpRouter } from './router/helpRouter';    //按模块拆分路由，一个模块尽量5-10个路由，



function RouterConfig({ history, app }) {
  registerModel(app, require('./models/app/App'));
  const routes = [
  {
      path: '',
     // onEnter:userIsInATeam,
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/home/Home'));
          //console.log(nextState);
          cb(null, { component:require('./routes/home/Home')})
        },'Home');
      },
    childRoutes: [
      ...homeRouter(app),
      ...myPlanRouter(app),
      ...changePlanRouter(app),
      ...myOrderRouter(app),
      ...helpRouter(app),
      ...errorRouter(app)
    ],



  // {
  //   path: '/users',
  //   name: 'UsersPage',
  //   getComponent(nextState, cb) {
  //     require.ensure([], (require) => {
  //       registerModel(app, require('./models/users'));
  //       cb(null, require('./routes/Users'));
  //     });
  //   },
  // },
   }
];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
