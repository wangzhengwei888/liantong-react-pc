import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.html';
import './index.less';
//import 'normalize.css';
import 'babel-polyfill';


import { persistState } from 'redux-devtools';       //生产版本是要把devtool注释掉。
import DevTools from './utils/DevTools';               //生产版本是要把devtool注释掉。

// const enhancer = compose(
//   DevTools.instrument(),
//   persistState(
//     window.location.href.match(
//       /[?&]debug_session=([^&#]+)\b/
//     )
//   )
// );

// const app = dva({
//   extraEnhancers: [autoRehydrate()],
// });

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize



 const app = dva({
    history: browserHistory,
    onError(e) {
      message.error(e.message, ERROR_MSG_DURATION);
    }
 })

// const app = dva({
//   history: browserHistory,
//   onError(e) {
//     message.error(e.message, ERROR_MSG_DURATION);
//   },
//   extraEnhancers: [
//     DevTools.instrument(),
//     persistState(
//       window.location.href.match(
//         /[?&]debug_session=([^&#]+)\b/
//       )
//     )],
// });



//console.log(TOOL);
// 2. Plugins
app.use(createLoading({ effects: true }));

if(TOOL==="DEV"){
  app.use({
    extraEnhancers: [
      DevTools.instrument(),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&#]+)\b/
        )
      )]
  });
}

// 3. Model
// Moved to router.js

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
