const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  profileId: state => state.user.profileId,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  headMenuType: state => state.user.headMenuType,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,

  errorLogs: state => state.errorLog.logs,

  companyCode: state => state.company.CompanyCode,
  permissions: state => state.permission.permissions, // 权限

  financeReport_navigation: state => state.financeReport.navigation, // 财务表表--导航
  financeReport_time: state => state.financeReport.Report_time // 财务表表--导航

}
export default getters
