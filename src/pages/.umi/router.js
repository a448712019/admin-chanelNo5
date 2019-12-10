import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/sunjinpeng/Desktop/new-chanelNo5/src/pages/.umi/LocaleWrapper.jsx';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: require('../user/login').default,
        exact: true,
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: require('../user/register').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/sunjinpeng/Desktop/new-chanelNo5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: require('../../layouts/BasicLayout').default,
        routes: [
          {
            path: '/',
            redirect: '/home',
            exact: true,
          },
          {
            path: '/home',
            icon: 'home',
            name: 'homes',
            authority: ['home'],
            component: require('../Welcome').default,
            exact: true,
          },
          {
            path: '/rolelistpage',
            authority: ['rolelistpage'],
            name: 'rolelistpage',
            icon: 'eye-invisible',
            component: require('../AuthorManage/AuthorManage').default,
            exact: true,
          },
          {
            path: '/teacherManage',
            icon: 'dashboard',
            name: 'teacher',
            authority: ['administrators'],
            component: require('../TeacherManage/TeacherManage').default,
            exact: true,
          },
          {
            path: '/stageManage',
            icon: 'pic-right',
            authority: ['fenzuguanli'],
            name: 'stageManage',
            routes: [
              {
                path: '/stageManage/stage1',
                name: 'stage1',
                authority: ['fenzuguanli1'],
                component: require('../StageOne/StageOne').default,
                exact: true,
              },
              {
                path: '/stageManage/transition',
                authority: ['fenzuguanli2'],
                name: 'stage2',
                component: require('../Transition/Transition').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/sunjinpeng/Desktop/new-chanelNo5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/stage',
            icon: 'align-left',
            name: 'stage',
            authority: ['jieduanguanli'],
            component: require('../StageManage/StageManage').default,
            exact: true,
          },
          {
            path: '/theme',
            icon: 'cloud',
            name: 'theme',
            authority: ['zhutiguanli'],
            component: require('../ThemeManage/ThemeManage').default,
            exact: true,
          },
          {
            path: '/step',
            icon: 'step-forward',
            name: 'step',
            authority: ['buzhouguanli'],
            routes: [
              {
                path: '/step/steplist',
                name: 'steplist',
                authority: ['buzhouguanli2'],
                component: require('../StepList/StepList').default,
                exact: true,
              },
              {
                path: '/step/stepcontent/:type/:id',
                hideInMenu: true,
                name: 'stepcontent',
                component: require('../StepContent/StepContent').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/sunjinpeng/Desktop/new-chanelNo5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/stage1GroupPerson/:id',
            hideInMenu: true,
            icon: 'user',
            name: 'stage1GroupPerson',
            component: require('../Stage1GroupPerson/Stage1GroupPerson')
              .default,
            exact: true,
          },
          {
            path: '/transitionGroupList/:id',
            hideInMenu: true,
            icon: 'user',
            name: 'stage1GroupPerson',
            component: require('../TransitionGroupPerson/TransitionGroupPerson')
              .default,
            exact: true,
          },
          {
            path: '/usermanage',
            icon: 'user',
            authority: ['yonghuguanli'],
            name: 'user',
            component: require('../UserManage/UserManage').default,
            exact: true,
          },
          {
            path: '/database',
            icon: 'user',
            hideInMenu: true,
            name: 'testpage',
            component: require('../TestPage/TestPage').default,
            exact: true,
          },
          {
            path: '/record',
            authority: ['tongji'],
            icon: 'reconciliation',
            name: 'allrecord',
            routes: [
              {
                path: '/record/day',
                name: 'dayrecord',
                authority: ['tongji'],
                component: require('../DayRecord/DayRecord').default,
                exact: true,
              },
              {
                path: '/record/transitiondata',
                name: '过渡期统计',
                authority: ['tongji'],
                component: require('../TransitionRecord/TransitionRecord')
                  .default,
                exact: true,
              },
              {
                path: '/record/stage',
                name: 'stagerecord',
                authority: ['tongji'],
                component: require('../StageRecord/StageRecord').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/sunjinpeng/Desktop/new-chanelNo5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/leaveList',
            icon: 'user',
            name: 'leave',
            authority: ['lizhiliebiao'],
            component: require('../LeaveList/LeaveList').default,
            exact: true,
          },
          {
            component: require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/sunjinpeng/Desktop/new-chanelNo5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/sunjinpeng/Desktop/new-chanelNo5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/sunjinpeng/Desktop/new-chanelNo5/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
