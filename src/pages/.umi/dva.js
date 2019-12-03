import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'authorManage', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/authorManage.js').default) });
app.model({ namespace: 'global', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/global.js').default) });
app.model({ namespace: 'leaveList', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/leaveList.js').default) });
app.model({ namespace: 'login', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/login.js').default) });
app.model({ namespace: 'recordManage', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/recordManage.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/setting.js').default) });
app.model({ namespace: 'stageManage', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/stageManage.js').default) });
app.model({ namespace: 'teacherManage', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/teacherManage.js').default) });
app.model({ namespace: 'themeManage', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/themeManage.js').default) });
app.model({ namespace: 'user', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/user.js').default) });
app.model({ namespace: 'userManage', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/models/userManage.js').default) });
app.model({ namespace: 'model', ...(require('/Users/sunjinpeng/Desktop/new-chanelNo5/src/pages/user/register/model.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
