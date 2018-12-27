export default {
  // component
  // 获取store里路由path：路径地址（component）
  'home': 'home/index',

  '/crm/mgmt': 'CustomerManagement/index', // 客户管理
  '/doc/enterprise': 'document/index', // 文档

  '/meeting/my': 'meeting/MyMeeting',
  '/meeting/manager': 'meeting/MeetingManagement',
  '/meeting/room': 'meeting/RoomManagement',
  '/meeting/roomstate': 'meeting/MeetingRoomState',

  // '/dc/attendance': '', // 考勤明细--数据中心

  '/kpi/record': 'PerformanceAppraisal/WorkRegistrationPage', // "工作登记"--"绩效考核"
  // '/kpi/report': 'PerformanceAppraisal/StatisticsPage', // 员工考核统计--"绩效考核"
  '/kpi/setting': 'PerformanceAppraisal/SetDifficultyPage', // "考核规则设置"--"绩效考核"

  '/job/resume': 'CorporationRecruitment/ResumemManage', // "简历管理"
  '/job/position': 'CorporationRecruitment/JobPostListting', // "职位发布"
  '/job/setting': 'CorporationRecruitment/RecruitmEntenterprise', // "招聘设置"
  '/job/search': 'CorporationRecruitment/ResumeSearch', // "搜索简历"

  '/hr/staff': 'PersonnelManagement/index', // 员工管理
  '/hr/attendance': '', // 考勤管理

  '/task/my': 'task/MyTask', // "我的任务"
  '/task/manager': 'task/index', // "任务管理"

  '/apply/application': 'ApplyApproval/apply', // 我的申请
  '/apply/cert': 'ApplyApproval/approval', // 我的审批
  '/apply/audit': 'ApplyApproval/application', // 凭证

  '/manager/company': 'CompanyInformationManagement/CompanyInformationManagement', // 企业信息管理
  '/manager/permission': 'JurisdictionManage/DocumentJurisIndex', // 权限管理
  '/manager/approval-type': 'manager/ApprovalCategoryManagement', // 审批管理
  '/manager/announcement': '', // 公告管理
  '/manager/org': 'manager/organizationalStructure', // 组织架构管理
  '/manager/admin': 'manager/Administrator', // "管理员权限"
  '/manager/log': 'manager/operationLogIndex' // 操作日志
}
