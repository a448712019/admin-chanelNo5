import defaultSettings from "./defaultSettings"; // https://umijs.org/config/

import slash from "slash2";
import webpackPlugin from "./plugin.config";
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site";
const plugins = [
  [
    "umi-plugin-react",
    {
      antd: true,
      dva: {
        hmr: true
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: "zh-CN",
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: "InjectManifest",
            workboxOptions: {
              importWorkboxFrom: "local"
            }
          }
        : false // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    }
  ],
  [
    "umi-plugin-pro-block",
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true
    }
  ]
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    "umi-plugin-ga",
    {
      code: "UA-72788897-6"
    }
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: "https://github.com/ant-design/pro-blocks"
  },
  hash: true,
  targets: {
    ie: 11
  },
  base: "/admin/",
  // basename: '/admin/',
  publicPath: "/admin/",
  devtool: isAntDesignProPreview ? "source-map" : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: "/user",
      component: "../layouts/UserLayout",
      routes: [
        {
          name: "login",
          path: "/user/login",
          component: "./user/login"
        },
        {
          name: "register",
          icon: "smile",
          path: "/user/register",
          component: "./user/register"
        }
      ]
    },
    {
      path: "/",
      component: "../layouts/SecurityLayout",
      // Routes: ["src/pages/Authorized"],
      routes: [
        {
          path: "/",
          component: "../layouts/BasicLayout",
          // authority: ['admin', 'user'],
          routes: [
            {
              path: "/",
              redirect: "/home"
            },
            {
              path: "/home",
              icon: "home",
              // key: 'home',
              name: "homes",
              authority: ["home"],
              component: "./Welcome"
            },
            {
              path: "rolelistpage",
              authority: ["rolelistpage"],
              name: "rolelistpage",
              icon: "eye-invisible",
              component: "./AuthorManage/AuthorManage"
            },
            {
              path: "/teacherManage",
              icon: "dashboard",
              // key: 'administrators',
              name: "teacher",
              authority: ["administrators"],
              component: "./TeacherManage/TeacherManage"
            },
            {
              path: "/stageManage",
              icon: "pic-right",
              // key: 'fenzuguanli',
              authority: ["fenzuguanli"],
              name: "stageManage",
              routes: [
                {
                  path: "stage1",
                  name: "stage1",
                  authority: ["fenzuguanli1"],
                  // key: 'fenzuguanli1',
                  component: "./StageOne/StageOne"
                },
                {
                  path: "transition",
                  authority: ["fenzuguanli2"],
                  // key: 'fenzuguanli2',
                  name: "stage2",
                  component: "./Transition/Transition"
                }
              ]
            },
            {
              path: "/stage",
              icon: "align-left",
              name: "stage",
              authority: ["jieduanguanli"],
              // key: 'jieduanguanli',
              component: "./StageManage/StageManage"
            },

            {
              path: "/theme",
              icon: "cloud",
              name: "theme",
              authority: ["zhutiguanli"],
              // key: 'zhutiguanli',
              component: "./ThemeManage/ThemeManage"
            },
            {
              path: "/step",
              // key: 'buzhouguanli',
              icon: "step-forward",
              name: "step",
              authority: ["buzhouguanli"],
              routes: [
                {
                  path: "steplist",
                  name: "steplist",
                  authority: ["buzhouguanli2"],
                  // key: 'buzhouguanli2',
                  component: "./StepList/StepList"
                },
                {
                  path: "stepcontent/:type/:id",
                  hideInMenu: true,
                  name: "stepcontent",
                  component: "./StepContent/StepContent"
                }
              ]
            },
            {
              path: "/stage1GroupPerson/:id",
              hideInMenu: true,
              icon: "user",
              // key: 'yonghuguanli',
              name: "stage1GroupPerson",
              component: "./Stage1GroupPerson/Stage1GroupPerson"
            },
            {
              path: "/transitionGroupList/:id",
              hideInMenu: true,
              icon: "user",
              // key: 'yonghuguanli',
              name: "stage1GroupPerson",
              component: "./TransitionGroupPerson/TransitionGroupPerson"
            },
            {
              path: "/usermanage",
              icon: "user",
              authority: ["yonghuguanli"],
              // key: 'yonghuguanli',
              name: "user",
              component: "./UserManage/UserManage"
            },
            {
              path: "/database",
              icon: "user",
              hideInMenu: true,
              // authority: ["yonghuguanli"],
              // key: 'yonghuguanli',
              name: "testpage",
              component: "./TestPage/TestPage"
            },
            // {
            //   path: "/courseware",
            //   icon: "form",
            //   // key: 'statistics',
            //   name: "courseware",
            //   // authority: ["courseware"],
            //   component: "./Courseware/Courseware"
            // },
            {
              path: "/record",
              authority: ["tongji"],
              icon: "reconciliation",
              name: "allrecord",
              // key: 'tongji',
              routes: [
                {
                  path: "day",
                  name: "dayrecord",
                  authority: ["tongji"],
                  component: "./DayRecord/DayRecord"
                },
                {
                  path: "transitiondata",
                  name: "过渡期统计",
                  authority: ["tongji"],
                  component: "./TransitionRecord/TransitionRecord"
                },
                {
                  path: "stage",
                  name: "stagerecord",
                  authority: ["tongji"],
                  component: "./StageRecord/StageRecord"
                },
              ]
            },
            {
              path: "/leaveList",
              icon: "user",
              // key: 'statistics',
              name: "leave",
              authority: ["lizhiliebiao"],
              component: "./LeaveList/LeaveList"
            },
            {
              component: "./404"
            }
          ]
        },
        {
          component: "./404"
        }
      ]
    },
    {
      component: "./404"
    }
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    "primary-color": primaryColor
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || "" // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes("node_modules") ||
        context.resourcePath.includes("ant.design.pro.less") ||
        context.resourcePath.includes("global.less")
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace(".less", "");
        const arr = slash(antdProPath)
          .split("/")
          .map(a => a.replace(/([A-Z])/g, "-$1"))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
      }

      return localName;
    }
  },
  manifest: {
    basePath: "/"
  },
  chainWebpack: webpackPlugin,
  proxy: {
    "/api.php": {
      target: "http://chanel.widiazine.cn/api.php?",
      changeOrigin: true,
      pathRewrite: { "^/server": "" }
    }
  }
};
