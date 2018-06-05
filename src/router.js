import React from 'react';
import { Router } from 'dva/router';
import App from './routes/app/App';
import { registerModel } from './utils/common';
import { homeRouter } from './router/homeRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { loginRouter } from './router/loginRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { goodsDetailRouter } from './router/goodsDetailRouter';    //按模块拆分路由，一个模块尽量5-10个路由，
import { orderRouter } from './router/orderRouter';
import { paymentRouter } from './router/paymentRouter';
import { storeRouter } from './router/storeRouter';
import { personRouter } from './router/personRouter';
import { personOrderRouter } from './router/personOrderRouter';
import { circleRouter } from './router/circleRouter';
import { informationRouter} from './router/informationRouter';
import { errorRouter} from './router/errorRouter';
import { productRouter } from './router/productRouter';
import { brandRouter } from './router/brandRouter';
import { technologyRouter } from './router/technologyRouter';
import { featureServiceRouter } from './router/featureServiceRouter';
import { drugReagentRouter } from './router/drugReagentRouter';

import { customServiceRouter } from './router/customServiceRouter';
import { presonAccountRouter } from './router/presonAccountRouter';
import { newRouter } from './router/newRouter';
import { presonIntegralRouter } from './router/personIntegralRouter';
import { groupRouter } from './router/groupRouter';
import { presonInvoiceRouter } from './router/presonInvoiceRouter';



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
      ...loginRouter(app),
      ...orderRouter(app),
      ...goodsDetailRouter(app),
      ...paymentRouter(app),
      ...storeRouter(app),
      ...personRouter(app),
      ...personOrderRouter(app),
      ...circleRouter(app),
      ...informationRouter(app),
      ...productRouter(app),
      ...brandRouter(app),
      ...technologyRouter(app),
      ...customServiceRouter(app),
      ...featureServiceRouter(app),
      ...drugReagentRouter(app),
      ...presonAccountRouter(app),
      ...newRouter(app),
      ...presonIntegralRouter(app),
      ...groupRouter(app),
      ...presonInvoiceRouter(app),
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
