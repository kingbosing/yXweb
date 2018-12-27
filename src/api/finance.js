import request from '@/utils/request'

// POST /api/v2/BusarManage/SaveInitManage保存财务初始化管理设置
export function SaveInitManage(token, setDate) {
  return request({
    url: 'apix/v2/BusarManage/SaveInitManage',
    method: 'post',
    params: { token },
    data: setDate
  })
}

// GET /api/v2/BusarManage/GetInitManage获取财务初始化管理设置
export function GetInitManage(token) {
  return request({
    url: 'apix/v2/BusarManage/GetInitManage',
    method: 'get',
    params: { token }
  })
}

// GET /api/v2/BusarManage/JudgeInitManage判断是否设置财务初始化管理
export function JudgeInitManage(token) {
  return request({
    url: 'apix/v2/BusarManage/JudgeInitManage',
    method: 'get',
    params: { token }
  })
}

// GET /api/v2/BusarManage/GetParameterSetting获取当前科目参数设置
export function GetParameterSetting(token) {
  return request({
    url: 'apix/v2/BusarManage/GetParameterSetting',
    method: 'get',
    params: { token }
  })
}

// POST /api/v2/BusarManage/SaveParameterSetting 保存科目参数设置
export function SaveParameterSetting(token, setDate) {
  return request({
    url: 'apix/v2/BusarManage/SaveParameterSetting',
    method: 'post',
    params: { token },
    data: setDate
  })
}

// /api/v2/BusarManage/AccountIsOpen 判断当前用户是否已开账
export function AccountIsOpen(token) {
  return request({
    url: 'apix/v2/BusarManage/AccountIsOpen',
    method: 'get',
    params: { token }
  })
}

// GET /api/v2/BusarManage/JudgeInitManageTip 判断财务未初始化设置提示界面
export function JudgeInitManageTip(token) {
  return request({
    url: 'apix/v2/BusarManage/JudgeInitManageTip',
    method: 'get',
    params: { token }
  })
}

// GET /api/v2/BusarManage/GetApprovalList 获取关联审批下拉列表
export function GetApprovalList(token) {
  return request({
    url: 'apix/v2/BusarManage/GetApprovalList',
    method: 'get',
    params: { token }
  })
}

// POST /api/v2/BusarManage/AddOrEditCertificate 新增、编辑会计凭证
export function AddOrEditCertificate(token, setDate) {
  return request({
    url: 'apix/v2/BusarManage/AddOrEditCertificate',
    method: 'post',
    params: { token },
    data: setDate
  })
}

// POST /api/v2/BusarManage/DeleteSingleCertificate 删除单个会计凭证
export function DeleteSingleCertificate(token, keyid) {
  return request({
    url: 'apix/v2/BusarManage/DeleteSingleCertificate',
    method: 'post',
    params: { token, keyid }
  })
}

// /api/v2/BusarManage/GetDefaultRecordDate 获取凭证默认日期
export function GetDefaultRecordDate(token) {
  return request({
    url: 'apix/v2/BusarManage/GetDefaultRecordDate',
    method: 'get',
    params: { token }
  })
}

// /api/v2/BusarManage/CreateVoucherNumber 生成凭证号
export function CreateVoucherNumber(token, date) {
  return request({
    url: 'apix/v2/BusarManage/CreateVoucherNumber',
    method: 'get',
    params: { token, date }
  })
}

// /api/v2/BusarManage/GetCertificateList 获取我的凭证列表
export function GetCertificateList(token, startyear, startmonth, endyear, endmonth, status, sort, isapp, searchtext) {
  return request({
    url: 'apix/v2/BusarManage/GetCertificateList',
    method: 'get',
    params: { token, startyear, startmonth, endyear, endmonth, status, sort, isapp, searchtext }
  })
}

// GET /api/v2/BusarManage/GetCertificateDetail 获取凭证详情
export function GetCertificateDetail(token, id) {
  return request({
    url: 'apix/v2/BusarManage/GetCertificateDetail',
    method: 'get',
    params: { token, id }
  })
}

// POST /api/v2/BusarManage/ArrangeBrokenNumber 整理断号
export function ArrangeBrokenNumber(token, model) {
  return request({
    url: 'apix/v2/BusarManage/ArrangeBrokenNumber',
    method: 'post',
    params: { token },
    data: model
  })
}

// POST /api/v2/BusarManage/AuditSingleCertificate 审核/反审核单个凭证
export function AuditSingleCertificate(token, keyid, type) {
  return request({
    url: 'apix/v2/BusarManage/AuditSingleCertificate',
    method: 'post',
    params: { token, keyid, type }
  })
}

// /api/v2/BusarManage/AuditMultiCertificate 批量审核/反审核凭证
export function AuditMultiCertificate(token, model) {
  return request({
    url: 'apix/v2/BusarManage/AuditMultiCertificate',
    method: 'post',
    params: { token },
    data: model
  })
}

// POST /api/v2/BusarManage/AuditCertificateCheck 审核凭证校验
export function AuditCertificateCheck(token, model) {
  return request({
    url: 'apix/v2/BusarManage/AuditCertificateCheck',
    method: 'post',
    params: { token },
    data: model
  })
}

// POST /api/v2/BusarManage/DeleteCertificateCheck 删除凭证校验
export function DeleteCertificateCheck(token, model) {
  return request({
    url: 'apix/v2/BusarManage/DeleteCertificateCheck',
    method: 'post',
    params: { token },
    data: model
  })
}

// POST /api/v2/BusarManage/DeleteMultiCertificate 批量删除会计凭证
export function DeleteMultiCertificate(token, model) {
  return request({
    url: 'apix/v2/BusarManage/DeleteMultiCertificate',
    method: 'post',
    params: { token },
    data: model
  })
}

// /api/v2/BusarManage/GetDetailAccountList 获取明细账列表
export function GetDetailAccountList(token, startyear, startmonth, endyear, endmonth, busarsubjectid, operate, type) {
  return request({
    url: 'apix/v2/BusarManage/GetDetailAccountList',
    method: 'get',
    params: { token, startyear, startmonth, endyear, endmonth, busarsubjectid, operate, type }
  })
}

// /api/v2/BusarManage/GetSubjectBalanceTable 获取科目余额表
export function GetSubjectBalanceTable(token, startyear, startmonth, endyear, endmonth) {
  return request({
    url: 'apix/v2/BusarManage/GetSubjectBalanceTable',
    method: 'get',
    params: { token, startyear, startmonth, endyear, endmonth }
  })
}

// 资产负债表
// /api/v2/BusarManage/GetAssetLiabilityList
// ?searchyear=2018&searchmonth=10&request.token
export function GetAssetLiabilityList(token, searchyear, searchmonth) {
  return request({
    url: 'apix/v2/BusarManage/GetAssetLiabilityList',
    method: 'GET',
    params: { token, searchyear, searchmonth }
  })
}

// 加载公式列表-资产负债表
// /api/v2/BusarManage/LoadAssetLiabilityFormulaList
export function LoadAssetLiabilityFormulaList(token, busarassetliabilityid) {
  return request({
    url: 'apix/v2/BusarManage/LoadAssetLiabilityFormulaList',
    method: 'GET',
    params: { token, busarassetliabilityid }
  })
}

// 编辑公式-资产负债表
// /api/v2/BusarManage/SaveAssetLiabilityFormula
export function SaveAssetLiabilityFormula(token, busarassetliabilityid, FormulaList) {
  return request({
    url: 'apix/v2/BusarManage/SaveAssetLiabilityFormula',
    method: 'post',
    params: { token },
    data: { busarassetliabilityid, FormulaList }
  })
}

// 公式复位-资产负债表
// POST /api/v2/BusarManage/ResetAssetFormula
export function ResetAssetFormula(token, busarassetliabilityid) {
  return request({
    url: 'apix/v2/BusarManage/ResetAssetFormula',
    method: 'post',
    params: { token, busarassetliabilityid }
  })
}

// 利润表
// /api/v2/BusarManage/GetProfitList
export function GetProfitList(token, searchyear, searchmonth) {
  return request({
    url: 'apix/v2/BusarManage/GetProfitList',
    method: 'GET',
    params: { token, searchyear, searchmonth }
  })
}

// 加载公式列表-利润表
// /api/v2/BusarManage/LoadProfitFormulaList
export function LoadProfitFormulaList(token, BusarProfitId) {
  return request({
    url: 'apix/v2/BusarManage/LoadProfitFormulaList',
    method: 'GET',
    params: { token, BusarProfitId }
  })
}

// 编辑公式-利润表
// /api/v2/BusarManage/SaveProfitFormula
export function SaveProfitFormula(token, BusarProfitId, FormulaList) {
  return request({
    url: 'apix/v2/BusarManage/SaveProfitFormula',
    method: 'post',
    params: { token },
    data: { BusarProfitId, FormulaList }
  })
}

// 公式复位-利润表
// /api/v2/BusarManage/ResetProfitFormula
export function ResetProfitFormula(token, BusarProfitId) {
  return request({
    url: 'apix/v2/BusarManage/ResetProfitFormula',
    method: 'post',
    params: { token, BusarProfitId }
  })
}

