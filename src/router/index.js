import Vue from 'vue'
import Router from 'vue-router'
import KeyImportConfig from './keyimport'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import DefaultMain from '../views/layout/DefaultMain'
// /** note: submenu only apppear when children.length>=1
//  *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
//  **/

// /**
// * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
// * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
// *                                if not set alwaysShow, only more than one route under the children
// *                                it will becomes nested mode, otherwise not show the root menu
// * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
// * name:'router-name'             the name is used by <keep-alive> (must set!!!)
// * type: 'User'                   分为3种 User：工作台 Manager：综合管理 Tester：测试页面
// * meta : {
//     roles: ['admin','editor']     will control the page roles (you can set multiple roles)
//     title: 'title'               the name show in submenu and breadcrumb (recommend set)
//     icon: 'svg-name'             the icon show in the sidebar,
//     noCache: true                if true ,the page will no be cached(default is false)
//     page: '/home'                全局跳转时，使用此参数，当此参数存在时，会进行非单页内的跳转
//   }
// **/

// 测试用的菜单项--组件
const testerRouterMap = [

  {
    path: '/demo',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: 'Demo', icon: 'clipboard' },
    type: 'Tester',
    children: [
      {
        path: '/dash/crm',
        component: _import('crm/index'),
        name: 'demo-crm',
        meta: { title: 'menu-v' }
      },
      {
        path: '/demo/menu-v',
        component: _import('components-demo/menu-v'),
        name: 'menu-v',
        meta: { title: 'menu-v' }
      },
      {
        path: '/demo/log',
        component: _import('errorLog/index'),
        name: 'errorLog',
        meta: { title: 'errorLog' }
      },
      {
        path: '/demo/page',
        component: _import('permission/page'),
        name: 'pagePermission',
        meta: {
          title: 'pagePermission',
          icon: 'lock',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: '/demo/directive',
        component: _import('permission/directive'),
        name: 'directivePermission',
        meta: {
          title: 'directivePermission',
          icon: 'lock'
        }
      },
      {
        path: '/demo/index',
        component: _import('svg-icons/index'),
        name: 'icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      },
      {
        path: '/demo/components',
        component: DefaultMain,
        redirect: '/demo/components/fileicon-demo',
        name: 'componentsdemo',
        meta: {
          title: '组件',
          icon: 'component'
        },
        children: [
          {
            path: 'file-icon-demo',
            component: _import('components-demo/fileicon-demo'),
            name: 'file-icon-demo',
            meta: { title: '文件图标' }
          }
        ]
      },
      {
        path: '/charts',
        component: DefaultMain,
        redirect: 'noredirect',
        name: 'charts',
        meta: {
          title: 'charts',
          icon: 'chart'
        },
        children: [
          {
            path: 'keyboard',
            component: _import('charts/keyboard'),
            name: 'keyboardChart',
            meta: { title: 'keyboardChart', noCache: true }
          },
          {
            path: 'line',
            component: _import('charts/line'),
            name: 'lineChart',
            meta: { title: 'lineChart', noCache: true }
          },
          {
            path: 'mixchart',
            component: _import('charts/mixChart'),
            name: 'mixChart',
            meta: { title: 'mixChart', noCache: true }
          }
        ]
      },
      {
        path: 'form',
        component: DefaultMain,
        redirect: 'noredirect',
        name: 'form',
        meta: {
          title: 'form',
          icon: 'form'
        },
        children: []
      },
      {
        path: '/error',
        component: DefaultMain,
        redirect: 'noredirect',
        name: 'errorPages',
        meta: {
          title: 'errorPages',
          icon: '404'
        },
        children: [
          {
            path: '401',
            component: _import('errorPage/401'),
            name: 'page401',
            meta: { title: 'page401', noCache: true }
          },
          {
            path: '404',
            component: _import('errorPage/404'),
            name: 'page404',
            meta: { title: 'page404', noCache: true }
          }
        ]
      },

      {
        path: '/demo/buttons',
        component: _import('buttons/index'),
        name: 'theme',
        meta: { title: '按钮及表单', icon: 'theme' }
      },

      {
        path: '/demo/clipboard',
        component: _import('clipboard/index'),
        name: 'clipboardDemo',
        meta: { title: '剪切版 Demo', icon: 'clipboard' }
      },
      {
        path: '/demo/upLoad',
        component: _import('upLoad/index'),
        name: 'upLoadDemo',
        meta: { title: '上传 Demo', icon: 'clipboard' }
      },
      {
        path: '/demo/dialogDep',
        component: _import('dialogDep/index'),
        name: 'dialogDepDemo',
        meta: { title: '选人选部门 Demo', icon: 'clipboard' }
      }
    ]
  }
]
// 测试用的菜单项--小赢计划
const testerRouterXYMap = [
  {
    path: '/XY',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '小赢计划', icon: 'clipboard' },
    type: 'Tester',
    children: [
      {
        path: '/XY/dialogDep',
        component: _import('dialogDep/index'),
        name: 'dialogDepDemo',
        hidden: false,
        meta: { title: '选人选部门 Demo', icon: 'clipboard' }
      }
    ]
  },
  {
    path: '/home',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '首页', icon: 'clipboard' },
    type: 'Tester',
    children: [
      {
        path: '/home/index',
        component: _import('home/index'),
        name: 'home',
        hidden: false,
        meta: { title: '首页', icon: 'clipboard' }
      },
      {
        path: '/home/BusinessCard',
        component: _import('Card/BusinessCard'),
        name: 'BusinessCard',
        hidden: true,
        meta: { title: '企业/个人名片', icon: 'clipboard' }
      },
      {
        path: '/home/PersonalCard',
        component: _import('Card/PersonalCard'),
        name: 'PersonalCard',
        hidden: false,
        meta: { title: '个人名片', icon: 'clipboard' }
      },
      {
        path: '/home/JoinOrCreate',
        component: _import('home/JoinOrCreate'),
        name: 'JoinOrCreate',
        hidden: true,
        meta: { title: '创建/加入公司', icon: 'clipboard' }
      },
      {
        path: '/home/CreateCompany',
        component: _import('home/CreateCompany'),
        name: 'CreateCompany',
        hidden: true,
        meta: { title: '创建公司', icon: 'clipboard' }
      },
      {
        path: '/home/NoviceGuide',
        component: _import('home/NoviceGuide'),
        name: 'NoviceGuide',
        hidden: true,
        meta: { title: '新手引导', icon: 'clipboard' }
      }
    ]
  },
  {
    path: '/CustomerManagement',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '客户', icon: 'clipboard' },
    type: 'Tester',
    infoPath: '/CustomerManagement/informationCustomer',
    children: [
      {
        path: '/CustomerManagement/index',
        component: _import('CustomerManagement/index'),
        name: 'CustomerManagement',
        hidden: false,

        meta: { title: '客户管理', icon: 'clipboard' }
      },
      {
        path: '/CustomerManagement/newPage',
        component: _import('CustomerManagement/newPage'),
        name: 'newPageCustomer',
        hidden: true,
        meta: { title: '新建客户', icon: 'clipboard' }
      },
      {
        path: '/CustomerManagement/edit',
        component: _import('CustomerManagement/newPage'),
        name: 'editCustomer',
        hidden: true,
        meta: { title: '编辑客户', icon: 'clipboard' }
      },
      {
        path: '/CustomerManagement/informationCustomer',
        component: _import('Sap/informationCustomer'),
        name: 'informationCustomer',
        hidden: true,
        meta: { title: '客户管理可视化', icon: 'clipboard' }
      }
    ]
  },
  {
    path: '/announcement',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '公告', icon: 'clipboard' },
    type: 'Tester',
    children: [
      {
        path: '/announcement/index',
        component: _import('announcement/index'),
        name: 'index',
        hidden: false,

        meta: { title: '公告', icon: 'clipboard', noCache: true }
      },
      {
        path: '/announcement/Details',
        component: _import('announcement/Details'),
        name: 'Details',
        hidden: true,
        meta: { title: '公告详情', icon: 'clipboard', noCache: false }
      },
      {
        path: '/announcement/NewAnnouncement',
        component: _import('announcement/NewAnnouncement'),
        name: 'NewAnnouncement',
        hidden: true,
        meta: { title: '新建公告', icon: 'clipboard', noCache: false }
      },
      {
        path: '/announcement/DraftLibrary',
        component: _import('announcement/DraftLibrary'),
        name: 'DraftLibrary',
        hidden: true,
        meta: { title: '草稿库', icon: 'clipboard', noCache: false }
      }
    ]
  },
  {
    path: '/finance',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '财务管理', icon: 'finance' },
    type: 'Tester',
    children: [
      {
        path: '/finance/FinanceTally',
        component: _import('Finance/index'),
        name: 'FinanceTally',
        hidden: false,

        meta: { title: '会计记账', icon: 'documentation', noCache: true }
      },
      {
        path: '/finance/FinanceAccounting',
        component: _import('Finance/accounting'),
        name: 'FinanceAccounting',
        hidden: false,

        meta: { title: '会计账簿', icon: 'documentation', noCache: true }
      },
      {
        path: '/finance/FinanceReport',
        component: _import('Finance/report'),
        name: 'FinanceReport',
        hidden: false,

        meta: { title: '财务报表', icon: 'documentation', noCache: true }
      },
      {
        path: '/finance/FinanceSetup',
        component: _import('Finance/setup'),
        name: 'FinanceSetup',
        hidden: false,

        meta: { title: '财务设置', icon: 'documentation', noCache: true }
      },
      {
        path: '/finance/editorIndex',
        component: _import('Finance/editorIndex'),
        name: 'editorIndex',
        hidden: true,
        meta: { title: '编辑凭证', icon: 'documentation', noCache: true }
      },
      {
        path: '/finance/auditIndex',
        component: _import('Finance/auditIndex'),
        name: 'auditIndex',
        hidden: true,
        // hidden: true,
        meta: { title: '会计凭证审核', icon: 'documentation', noCache: true }
      },
      {
        path: '/manager/financialInitialization',
        component: _import('manager/financialInitialization'),
        name: 'financialInitialization',
        hidden: false,
        meta: { title: '财务初始化管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/operationLogIndex',
        component: _import('manager/operationLogIndex'),
        name: 'operationLogIndex',
        hidden: false,
        meta: { title: '操作日志', icon: 'documentation', noCache: true }
      },
      {
        path: '/manager/Administrator',
        component: _import('manager/Administrator'),
        name: 'Administrator',
        hidden: false,
        meta: { title: '管理员权限', icon: 'documentation', noCache: true }
      },
      {
        path: '/manager/organizationalStructure',
        component: _import('manager/organizationalStructure'),
        name: 'organizationalStructure',
        hidden: false,
        meta: { title: '组织架构管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/finance/promptIndex',
        component: _import('Finance/promptIndex'),
        name: 'promptIndex',
        hidden: false,
        meta: { title: '财务模块未初始化设置', icon: 'documentation', noCache: true }
      },
      {
        path: '/manager/ApprovalCategoryManagement',
        component: _import('manager/ApprovalCategoryManagement'),
        name: 'ApprovalCategoryManagement',
        hidden: false,
        meta: { title: '审批管理', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/meeting',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '会议管理', icon: 'meeting' },
    type: 'Tester',
    children: [
      {
        path: '/meeting/MyMeeting',
        component: _import('meeting/MyMeeting'),
        name: 'MyMeeting',
        hidden: false,
        meta: { title: '我的会议', icon: 'documentation', noCache: true }
      },
      {
        path: '/meeting/MeetingManagement',
        component: _import('meeting/MeetingManagement'),
        name: 'MeetingManagement',
        meta: { title: '会议管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/meeting/MeetingRoomManagement',
        component: _import('meeting/RoomManagement'),
        name: 'MeetingRoomManagement',
        hidden: false,
        meta: { title: '会议室信息管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/meeting/MeetingRoomState',
        component: _import('meeting/MeetingRoomState'),
        name: 'MeetingMeetingRoomState',
        hidden: false,
        meta: { title: '会议室使用情况', icon: 'documentation', noCache: true }
      },
      {
        path: '/meeting/NewMeetingRoom',
        component: _import('meeting/NewMeetingRoom'),
        name: 'NewMeetingRoom',
        hidden: true,
        meta: { title: '新建会议室', icon: 'documentation', noCache: false }
      },
      {
        path: '/meeting/Meeting_DraftLibrary',
        component: _import('meeting/Meeting_DraftLibrary'),
        name: 'Meeting_DraftLibrary',
        hidden: true,
        meta: { title: '草稿库', icon: 'documentation', noCache: false }
      }, // Meeting_Details
      {
        path: '/meeting/Meeting_Details',
        component: _import('meeting/Meeting_Details'),
        name: 'Meeting_Details',
        hidden: true,
        meta: { title: '会议详情', icon: 'documentation', noCache: true }
      },
      {
        path: '/meeting/Meeting_Add',
        component: _import('meeting/Meeting_Add'),
        name: 'Meeting_Add',
        hidden: true,
        meta: { title: '新建会议', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/task',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '任务', icon: 'task' },
    type: 'Tester',
    infoPath: '/task/informationTask',
    children: [
      {
        path: '/task/index',
        component: _import('task/index'),
        name: 'task_index',
        hidden: false,
        meta: { title: '任务管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/task/mytask',
        component: _import('task/MyTask'),
        name: 'task_MyTask',
        hidden: false,
        meta: { title: '我的任务', icon: 'documentation', noCache: true }
      },
      {
        path: '/task/TaskInfo',
        component: _import('task/TaskInfo'),
        name: 'task_TaskInfo',
        hidden: true,
        meta: { title: '任务详情', icon: 'documentation', noCache: true }
      },
      {
        path: '/task/NewTask',
        component: _import('task/NewTask'),
        name: 'task_NewTask',
        hidden: true,
        meta: { title: '创建任务', icon: 'documentation', noCache: true }
      },
      {
        path: '/task/EditTask',
        component: _import('task/EditTask'),
        name: 'task_EditTask',
        hidden: true,
        meta: { title: '编辑任务', icon: 'documentation', noCache: true }
      },
      {
        path: '/task/informationTask',
        component: _import('Sap/informationTask'),
        name: 'informationTask',
        hidden: true,
        meta: { title: '任务数据', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/ApplyApproval',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '申请审批', icon: 'task' },
    type: 'Tester',
    children: [
      {
        path: '/ApplyApproval/apply',
        component: _import('ApplyApproval/apply'),
        name: 'apply_index',
        hidden: false,
        meta: { title: '我的申请', icon: 'documentation', noCache: true }
      },
      {
        path: '/ApplyApproval/approval',
        component: _import('ApplyApproval/approval'),
        name: 'approval_index',
        hidden: false,
        meta: { title: '我的审批', icon: 'documentation', noCache: true }
      },
      {
        path: '/ApplyApproval/application',
        component: _import('ApplyApproval/application'),
        name: 'application_index',
        hidden: false,
        meta: { title: '申请凭证', icon: 'documentation', noCache: true }
      },
      {
        path: '/ApplyApproval/ApplyContent',
        component: _import('ApplyApproval/applyContent'),
        name: 'apply_content',
        hidden: true,
        meta: { title: '申请详情', icon: 'documentation', noCache: true }
      },
      {
        path: '/ApplyApproval/ApprovalContent',
        component: _import('ApplyApproval/approvalContent'),
        name: 'approval_content',
        hidden: true,
        meta: { title: '审批详情', icon: 'documentation', noCache: true }
      },
      {
        path: '/ApplyApproval/ApplicationContent',
        component: _import('ApplyApproval/applicationContent'),
        name: 'application_content',
        hidden: true,
        meta: { title: '凭证详情', icon: 'documentation', noCache: true }
      },
      {
        path: '/ApplyApproval/ApplyCreat',
        component: _import('ApplyApproval/ApplyCreat'),
        name: 'list_applyCreat',
        hidden: true,
        meta: { title: '新建申请', icon: 'documentation', noCache: true }
      },
      {
        path: '/ApplyApproval/toApply',
        component: _import('ApplyApproval/toApply'),
        name: 'to_Apply',
        hidden: true,
        meta: { title: '申请表单', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/PersonnelManagement',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '人事管理', icon: 'task' },
    type: 'Tester',
    infoPath: '/PersonnelManagement/informationPersonnel',
    children: [
      {
        path: '/PersonnelManagement/index',
        component: _import('PersonnelManagement/index'),
        name: 'PersonnelManagement_index',
        hidden: false,
        meta: { title: '员工管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/PersonnelManagement/staffInformationIndex',
        component: _import('PersonnelManagement/staffInformationIndex'),
        name: 'staffInformationIndex',
        hidden: true,
        meta: { title: '员工信息展示页', icon: 'documentation', noCache: true }
      }, {
        path: '/PersonnelManagement/staffEditor',
        component: _import('PersonnelManagement/staffEditor'),
        name: 'staffEditor',
        hidden: true,
        meta: { title: '员工信息编辑', icon: 'documentation', noCache: true }
      },
      {
        path: '/PersonnelManagement/SearchemployeePage',
        component: _import('PersonnelManagement/SearchemployeePage'),
        name: 'SearchemployeePage',
        hidden: true,
        meta: { title: '员工搜索', icon: 'documentation', noCache: true }
      },
      {
        path: '/PersonnelManagement/SearchJobPage',
        component: _import('PersonnelManagement/SearchJobPage'),
        name: 'SearchJobPage',
        hidden: true,
        meta: { title: '职位搜索', icon: 'documentation', noCache: true }
      },
      {
        path: '/PersonnelManagement/SearchResult',
        component: _import('PersonnelManagement/SearchResult'),
        name: 'SearchResult',
        hidden: true,
        meta: { title: '咨询结果', icon: 'documentation', noCache: true }
      },
      {
        path: '/PersonnelManagement/informationPersonnel',
        component: _import('Sap/informationPersonnel'),
        name: 'informationPersonnel',
        hidden: true,
        meta: { title: '人事数据可视化', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/PerformanceAppraisal',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '绩效考核', icon: 'task' },
    type: 'Tester',
    children: [
      {
        path: '/PerformanceAppraisal/WorkRegistrationPage',
        component: _import('PerformanceAppraisal/WorkRegistrationPage'),
        name: 'WorkRegistrationPage',
        hidden: false,
        meta: { title: '工作登记', icon: 'documentation', noCache: true }
      },
      // {
      //   path: '/PerformanceAppraisal/StatisticsPage',
      //   component: _import('PerformanceAppraisal/StatisticsPage'),
      //   name: 'StatisticsPage',
      //   hidden: false,
      //   meta: { title: '员工考核统计', icon: 'documentation', noCache: true }

      // },

      {
        path: '/PerformanceAppraisal/SetDifficultyPage',
        component: _import('PerformanceAppraisal/SetDifficultyPage'),
        name: 'SetDifficultyPage',
        hidden: false,
        meta: { title: '考核规则设置', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/JobContent_DetailPage',
        component: _import('PerformanceAppraisal/JobContent_DetailPage'),
        name: 'JobContent_DetailPage',
        hidden: true,
        meta: { title: '工作内容详情', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/JobContent_Detail_AddPage',
        component: _import('PerformanceAppraisal/JobContent_Detail_AddPage'),
        name: 'JobContent_Detail_AddPage',
        hidden: true,
        meta: { title: '新建工作内容', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/WorkAuditPage',
        component: _import('PerformanceAppraisal/WorkAuditPage'),
        name: 'WorkAuditPage',
        hidden: true,
        meta: { title: '工作审核', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/WorkAuditPersonal',
        component: _import('PerformanceAppraisal/WorkAuditPersonal'),
        name: 'WorkAuditPersonal',
        hidden: true,
        meta: { title: '个人工作审核', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/GeneralAssessmentPage',
        component: _import('PerformanceAppraisal/GeneralAssessmentPage'),
        name: 'GeneralAssessmentPage',
        hidden: true,
        meta: { title: '月通用考核', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/StatisticsPage',
        component: _import('PerformanceAppraisal/StatisticsPage'),
        name: 'StatisticsPage',
        hidden: false,
        meta: { title: '员工考核统计', icon: 'documentation', noCache: true }

      },
      {
        path: '/PerformanceAppraisal/StatisticsPage/ForPerformance',
        component: _import('PerformanceAppraisal/StatisticsPage_ForPerformance'),
        name: 'ForPerformance',
        hidden: true,
        meta: { title: '绩效考核月表', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/StatisticsPage/ForMonth',
        component: _import('PerformanceAppraisal/StatisticsPage_ForMonth'),
        name: 'ForMonth',
        hidden: true,
        meta: { title: '工作月报明细', icon: 'documentation', noCache: true }
      },
      {
        path: '/PerformanceAppraisal/StatisticsPage/ForDay',
        component: _import('PerformanceAppraisal/StatisticsPage_ForDay'),
        name: 'ForDay',
        hidden: true,
        meta: { title: '绩效考核日表', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/CorporationRecruitment',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '招聘管理', icon: 'task' },
    type: 'Tester',
    children: [
      {
        path: '/CorporationRecruitment/ResumemManage',
        component: _import('CorporationRecruitment/ResumemManage'),
        name: 'ResumemManageNew',
        hidden: false,
        meta: { title: '简历管理', icon: 'documentation', noCache: true },
        children: [
          { path: '/',
            hidden: false, name: '', meta: { title: '新投递', icon: 'documentation', noCache: true },
            component: _import('CorporationRecruitment/components/manageNews')
          },
          { path: '/CorporationRecruitment/ResumemManage/news',
            hidden: false, name: 'news', meta: { title: '新投递', icon: 'documentation', noCache: true },
            component: _import('CorporationRecruitment/components/manageNews')
          },
          { path: '/CorporationRecruitment/ResumemManage/interest',
            hidden: false, name: 'news', meta: { title: '感兴趣', icon: 'documentation', noCache: true },
            component: _import('CorporationRecruitment/components/manageInterest') },
          { path: '/CorporationRecruitment/ResumemManage/interview',
            hidden: false, name: 'news', meta: { title: '待面试', icon: 'documentation', noCache: true },
            component: _import('CorporationRecruitment/components/manageInterview') },
          { path: '/CorporationRecruitment/ResumemManage/hire',
            hidden: false, name: 'news', meta: { title: '待录用', icon: 'documentation', noCache: true },
            component: _import('CorporationRecruitment/components/manageHire') },
          { path: '/CorporationRecruitment/ResumemManage/induction',
            hidden: false, name: 'news', meta: { title: '待入职', icon: 'documentation', noCache: true },
            component: _import('CorporationRecruitment/components/manageInduction') },
          { path: '/CorporationRecruitment/ResumemManage/library',
            hidden: false, name: 'news', meta: { title: '简历库', icon: 'documentation', noCache: true },
            component: _import('CorporationRecruitment/components/manageLibrary') }

        ]

      },
      {
        path: '/CorporationRecruitment/resume',
        component: _import('CorporationRecruitment/resume'),
        name: 'resume',
        hidden: true,
        meta: { title: '简历詳情', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/ResumeSearch',
        component: _import('CorporationRecruitment/ResumeSearch'),
        name: 'ResumeSearch',
        hidden: false,
        meta: { title: '搜索简历', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/JobPostListting',
        component: _import('CorporationRecruitment/JobPostListting'),
        name: 'JobPostListting',
        hidden: false,
        meta: { title: '发布职位', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/toPost',
        component: _import('CorporationRecruitment/components/toPost'),
        name: 'JobPostListting',
        hidden: false,
        meta: { title: '去发布', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/RecruitmEntenterprise',
        component: _import('CorporationRecruitment/RecruitmEntenterprise'),
        name: 'RecruitmEntenterprise',
        hidden: false,
        meta: { title: '招聘设置', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/components/editCompanyinfo',
        component: _import('CorporationRecruitment/components/editCompanyinfo'),
        name: 'editCompanyinfo',
        hidden: true,
        meta: { title: '编辑企业信息', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/Value-addedService',
        component: _import('CorporationRecruitment/Value-addedService'),
        name: 'Value-addedService',
        hidden: false,
        meta: { title: '增值服务', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/VersionPay',
        component: _import('CorporationRecruitment/VersionPay'),
        name: 'VersionPay',
        hidden: true,
        meta: { title: '版本购买', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/RePayOrderList',
        component: _import('CorporationRecruitment/RePayOrderList'),
        name: 'RePayOrderList',
        hidden: true,
        meta: { title: '订单列表', icon: 'documentation', noCache: true }
      }, {
        path: '/CorporationRecruitment/RePayOrderDetail',
        component: _import('CorporationRecruitment/RePayOrderDetail'),
        name: 'RePayOrderDetail',
        hidden: true,
        meta: { title: '订单详情', icon: 'documentation', noCache: true }
      }, {
        path: '/CorporationRecruitment/Productpurchase',
        component: _import('CorporationRecruitment/Productpurchase'),
        name: 'Productpurchase',
        hidden: true,
        meta: { title: '商品购买', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/PurchaseConfirmation',
        component: _import('CorporationRecruitment/PurchaseConfirmation'),
        name: 'PurchaseConfirmation',
        hidden: true,
        meta: { title: '商品购买', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/bankOrderSuccessful',
        component: _import('CorporationRecruitment/bankOrderSuccessful'),
        name: 'bankOrderSuccessful',
        hidden: true,
        meta: { title: '银行下单成功', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/AlipayOrderSuccessful',
        component: _import('CorporationRecruitment/AlipayOrderSuccessful'),
        name: 'AlipayOrderSuccessful',
        hidden: true,
        meta: { title: '支付宝、微信下单成功', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/payConfirm',
        component: _import('CorporationRecruitment/payConfirm'),
        name: 'payConfirm',
        hidden: true,
        meta: { title: '确认支付-成功', icon: 'documentation', noCache: true }
      },
      {
        path: '/CorporationRecruitment/payFail',
        component: _import('CorporationRecruitment/payFail'),
        name: 'payFail',
        hidden: true,
        meta: { title: '支付失败', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/Attendance',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '考勤管理', icon: 'task' },
    type: 'Tester',
    children: [
      {
        path: '/Attendance/punchRanking',
        component: _import('Attendance/punchRanking'),
        name: 'punchRanking',
        hidden: false,
        meta: { title: '打卡排名', icon: 'documentation', noCache: true }
      },
      {
        path: '/Attendance/flightManagement',
        component: _import('Attendance/flightManagement'),
        name: 'flightManagement',
        hidden: false,
        meta: { title: '班次管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/Attendance/addflightManagement',
        component: _import('Attendance/addflightManagement'),
        name: 'addflightManagement',
        hidden: true,
        meta: { title: '班次新增', icon: 'documentation', noCache: true }
      },
      {
        path: '/Attendance/workforcemanagement',
        component: _import('Attendance/workforcemanagement'),
        name: 'workforcemanagement',
        hidden: false,
        meta: { title: '排班管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/Attendance/NewAttendance',
        component: _import('Attendance/NewAttendance'),
        name: 'NewAttendance',
        hidden: true,
        meta: { title: '新建排班', icon: 'documentation', noCache: true }
      },
      {
        path: '/Attendance/personalscheduling',
        component: _import('Attendance/personalscheduling'),
        name: 'personalscheduling',
        hidden: true,
        meta: { title: '个人排班', icon: 'documentation', noCache: true }
      },
      {
        path: '/Attendance/batchscheduling',
        component: _import('Attendance/batchscheduling'),
        name: 'batchscheduling',
        hidden: true,
        meta: { title: '批量排班', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/attendanceStatistics',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '考勤统计', icon: 'task' },
    type: 'Tester',
    children: [
      {
        path: '/attendanceStatistics/myAttendance',
        component: _import('attendanceStatistics/myAttendance'),
        name: 'myAttendance',
        hidden: false,
        meta: { title: '我的考勤', icon: 'documentation', noCache: true }
      },
      {
        path: '/attendanceStatistics/myAttendanceDetails',
        component: _import('attendanceStatistics/myAttendanceDetails'),
        name: 'myAttendanceDetails',
        hidden: true,
        meta: { title: '我的考勤-明细展示', icon: 'documentation', noCache: true }
      },
      {
        path: '/attendanceStatistics/punchDetails',
        component: _import('attendanceStatistics/punchDetails'),
        name: 'punchDetails',
        hidden: false,
        meta: { title: '打卡明细', icon: 'documentation', noCache: true }
      },
      {
        path: '/attendanceStatistics/monthlySummary',
        component: _import('attendanceStatistics/monthlySummary'),
        name: 'monthlySummary',
        hidden: false,
        meta: { title: '月度总汇', icon: 'documentation', noCache: true }
      },
      {
        path: '/attendanceStatistics/correction',
        component: _import('attendanceStatistics/correction'),
        name: 'correction',
        hidden: false,
        meta: { title: '考勤矫正', icon: 'documentation', noCache: true }
      }

    ]
  }
]
// 管理员--测试
// 综合管理使用的菜单项
const managerRouterMap = [
  {
    // id: 'Uzgg',
    path: '/manager',
    component: DefaultMain,
    redirct: 'noredirect',
    meta: { title: '综合管理', icon: 'management' },
    type: 'Manager',
    children: [
      {
        path: 'log',
        component: null,
        name: 'FrameworkManagement',
        meta: { title: '组织架构管理' },
        page: '/FrameworkManagement/'
      },
      {
        path: 'log',
        component: Layout,
        name: 'AdminManager',
        meta: { title: '管理员权限' },
        page: '/Manager/'
      },
      {
        path: '/JurisdictionManage/DocumentJurisIndex',
        component: _import('JurisdictionManage/DocumentJurisIndex'),
        name: 'JurisdictionManage',
        hidden: false,
        meta: { title: '权限管理', icon: 'documentation', noCache: true }
      },
      {
        path: 'log',
        component: Layout,
        name: 'ApprovalManager',
        meta: { title: '审批管理' },
        page: '/ApprovalCategoryManagement/ApprovalCategoryManagement'
      },
      {
        path: '/CompanyInformationManagement',
        component: _import('CompanyInformationManagement/CompanyInformationManagement'),
        name: 'CompanyInformationManagement',
        hidden: false,
        meta: { title: '企业信息管理', icon: 'documentation', noCache: true }
      },
      {
        path: '/CompanyInformationEdit',
        component: _import('CompanyInformationManagement/CompanyInformationEdit'),
        name: 'CompanyInformationEdit',
        hidden: false,
        meta: { title: '企业信息编辑', icon: 'documentation', noCache: true }
      },
      {
        path: '/manager/operationLogIndex',
        component: _import('manager/operationLogIndex'),
        name: 'operationLogIndex',
        hidden: false,
        meta: { title: '操作日志', icon: 'documentation', noCache: true }
      },
      {
        path: 'financialInitialization',
        component: _import('manager/financialInitialization'),
        name: 'financialInitialization',
        hidden: false,
        meta: { title: '财务初始化管理', icon: 'documentation', noCache: true }
      }
    ]
  }
]

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  // 新登录页
  { path: '/loginModule_index', component: _import('loginModule/index'), hidden: true },
  { path: '/loginModule/ForgetPassword', component: _import('loginModule/ForgetPassword'), hidden: true },
  { path: '/loginModule/ResetPassword', component: _import('loginModule/ResetPassword'), hidden: true },
  { path: '/loginModule/ResetSuccessful', component: _import('loginModule/ResetSuccessful'), hidden: true },
  { path: '/register_index', component: _import('register/index'), hidden: true },
  { path: '/register/RegisteInformation', component: _import('register/RegisteInformation'), hidden: true },
  { path: '/register/RegisteSuccession', component: _import('register/RegisteSuccession'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/chat',
    name: 'top-chat',
    component: Layout,
    redirect: '/chat/index',
    type: 'Chat',
    children: [
      {
        path: 'index',
        component: _import('chat/index'),
        name: 'chat_index',
        hidden: false,
        meta: { title: 'Chat', icon: 'documentation', noCache: true }
      }
    ]
  },
  {
    path: '/test',
    name: 'top-tester',
    component: Layout,
    type: 'Tester',
    children: [
      {
        path: '/dashboard',
        component: _import('dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      },
      {
        path: '/documentation',
        component: _import('documentation/index'),
        name: 'documentation',
        meta: { title: '示例', icon: 'documentation', noCache: true }
      }
    ].concat(testerRouterMap).concat(testerRouterXYMap).concat(managerRouterMap)
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

function convertToRouterFromPermissions(rootArray, allArray) {
  var routers = []
  // console.log(rootArray)
  for (var i = 0; i < rootArray.length; i++) {
    var item = rootArray[i]
    if (!item.IsMenu) continue
    var isFront = (item.Url || '').startsWith('#')
    var name = item.Key.substr(1).replace(/\//ig, '-')
    var router = {
      path: isFront ? item.Url.substr(1) : item.Key,
      name: name,
      component: (isFront && KeyImportConfig[item.Key]) ? _import(KeyImportConfig[item.Key]) : DefaultMain,
      children: convertToRouterFromPermissions(allArray.filter(c => c.ParentId == item.Id && c.IsMenu), allArray),
      meta: { title: item.Title, icon: item.ParentId == '' ? name : null, noCache: true }
    }
    if (!isFront) {
      router.page = item.Url
    } else {
      router.page = ''
    }
    routers.push(router)
  }
  if (routers.length) { return routers }
  return null
}
export function convertToRouters(state) {
  var permissions = state.permissions
  var rootUserPermissions = permissions.filter(c => c.Key != '/manager' && c.ParentId == '' && c.IsMenu)
  var rootManagerPermissions = permissions.filter(c => c.Key == '/manager')
  // 用户工作台用的菜单项
  var userRouters = convertToRouterFromPermissions(rootUserPermissions, permissions)
  // 综合管理使用的菜单项
  var managerRouters = convertToRouterFromPermissions(rootManagerPermissions, permissions)
  var root = [
    { path: '*', redirect: '/404', hidden: true },
    {
      path: '/oa',
      name: 'top-oa',
      component: Layout,
      type: 'User',
      children: [
        {
          path: '/home/index',
          name: 'home',
          page: '',
          meta: { title: '首页', icon: 'home', noCache: true },
          component: Layout,
          redirect: 'home',
          type: 'User'
        }
      ].concat(userRouters)
    }]
  state.hasManager = rootManagerPermissions.length > 0
  if (state.hasManager) {
    root.push({
      path: '/manage',
      name: 'top-manage',
      component: Layout,
      type: 'Manager',
      children: managerRouters
    })
  }
  return root
}
