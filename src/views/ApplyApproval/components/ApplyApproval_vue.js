import Vue from 'vue'
// 强制保留两位小数
function toDecimal2(x) {
  if (x == 0 || x == '') {
    var k = 0
    return k
  } else {
    const p = parseFloat(x)
    if (isNaN(p)) {
      return false
    }
    const f = Math.round(x * 100) / 100
    var s = f.toString()
    var rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  }
}
// /列表-卡片
Vue.prototype.showList = function(data) {
  var Data, k
  var str = ''
  if (data == '') {
    Data = ''
  } else {
    // Data = eval('(' + data + ')')
    Data = JSON.parse(data)
  }
  // console.log(Data)
  for (const key in Data) {
    k = key
  }
  if (k == 'General') {
    // console.log('通用申请')
    str = `<p>通用标题：${Data.General.Title}</p><p>申请内容：${Data.General.Content}</p>`
  } else if (k == 'ReimBursed') {
    // console.log('报销')
    var con = 0, s = '', s1 = ''
    for (let i = 0; i < Data.ReimBursed.length; i++) {
      var mun = Data.ReimBursed[i].Amount
      con += parseFloat(mun)
      if (i >= Data.ReimBursed.length - 1) {
        s += Data.ReimBursed[i].Details
        s1 += Data.ReimBursed[i].Categories
      } else {
        s += Data.ReimBursed[i].Details + ','
        s1 += Data.ReimBursed[i].Categories + ','
      }
    }
    // if (s) {
    //    str = `<p>所属类别：${s1}</p><p>报销金额：${toDecimal2(con)}元</p><p>费用明细：${s}</p>`;
    // } else {

    // }
    str = `<p>所属类别：${s1}</p><p>报销金额：${toDecimal2(con)}元</p>`
  } else if (k == 'MaterialRequisition') {
    // console.log('物品领用');
    var Tstr = ''
    var MaterialRequisition = Data.MaterialRequisition.List
    for (let i = 0; i < MaterialRequisition.length; i++) {
      if (i >= MaterialRequisition.length - 1) {
        Tstr += MaterialRequisition[i].Name
      } else {
        Tstr += MaterialRequisition[i].Name + '，'
      }
    }
    str = `<p>物品名称：${Tstr}</p>`
  } else if (k == 'ConTract') {
    // console.log('合同');

    str = `<p>合同编号：${Data.ConTract.Number}</p><p>合同内容：${Data.ConTract.Content}</p>`
  } else if (k == 'Leave') {
    str = `<p>所属类别：${getLeaveType(Data.Leave.Type)}</p><p>开始时间：${Data.Leave.Start}</p><p>结束时间：${Data.Leave.End}</p>`
  } else if (k == 'Out') {
    str = `<p>开始时间：${Data.Out.Start}</p><p>结束时间：${Data.Out.End}</p><p>外出时长：${Data.Out.Days}天</p>`
  } else if (k == 'Over') {
    str = `<p>开始时间：${Data.Over.Start}</p><p>结束时间：${Data.Over.End}</p><p>加班时长：${Data.Over.Days}天</p>`
  } else if (k == 'Reissue') {
    // 补卡
    var str1 = ``, str2 = ``
    for (let i = 0; i < Data.Reissue.Sign.length; i++) {
      if (Data.Reissue.Sign[i].Count == 1) {
        str1 += `<span>签到补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      } else if (Data.Reissue.Sign[i].Count == 2) {
        str1 += `<span> 签退补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      } else if (Data.Reissue.Sign[i].Count == 3) {
        str2 += `<span>签退补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      } else if (Data.Reissue.Sign[i].Count == 4) {
        str2 += `<span> 签退补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      }
    }
    if (Data.Reissue.Reason) {
      str = `<p>补漏时间：${Data.Reissue.Date}</p>
                <p>事由：${Data.Reissue.Reason}</p>`
    } else {
      str = `<p>补漏时间：${Data.Reissue.Date}</p>
                `
    }
  } else if (k == 'Payment') {
    str = `<p>结算开始时间：${Data.Payment.Start}</p><p>结算结束时间：${Data.Payment.End}</p><p>总付款金额：${toDecimal2(Data.Payment.TotalPay)}元</p>`
  } else if (k == 'Purchase') {
    str = `<p>采购类型：${Data.Purchase.PurchaseType}</p><p>总预算：${toDecimal2(Data.Purchase.TotalBudget)}元</p><p>总数量：${Data.Purchase.TotalAmount}</p>`
  } else if (k == 'Bill') {
    str = `<p>发票种类：${Data.Bill.BillType}</p><p>发票抬头：${Data.Bill.BillName}</p><p>开票金额：${toDecimal2(Data.Bill.BillAmount)}元</p>`
  } else if (k == 'EmpNeed') {
    // console.log(Data.EmpNeed)
    str = `<p>需求部门：${Data.EmpNeed.Dept}</p><p>需求岗位：${Data.EmpNeed.Job}</p><p>需求人数：${Data.EmpNeed.Amount}</p>`
  } else if (k == 'EmpPositive') {
    // console.log(Data.EmpPositive)
    str = `<p>试用期岗位：${Data.EmpPositive.Job}</p><p>工号：${Data.EmpPositive.EmpNo}</p><p>转正类型：${Data.EmpPositive.Type}</p>`
  } else if (k == 'EmpLeave') {
    str = `<p>任职岗位：${Data.EmpLeave.Job}</p><p>工号：${Data.EmpLeave.EmpNo}</p><p>离职日期：${Data.EmpLeave.End}</p>`
  } else if (k == 'BusinessTrip') {
    str = `<p>开始时间：${Data.BusinessTrip.Start}</p><p>结束时间：${Data.BusinessTrip.End}</p><p>目的地：${Data.BusinessTrip.Destination}</p>`
  } else {
    str = '******此类型申请，格式正在调试中*****'
  }

  return str
}

// /打印基本信息
Vue.prototype.PrintBaseInfo = function(data) {
  var Data, k
  var str = ''
  if (data == '') {
    Data = ''
  } else {
    // Data = eval('(' + data + ')')
    Data = JSON.parse(data)
  }
  // console.log(Data)
  for (const key in Data) {
    k = key
  }
  if (k == 'General') {
    // console.log('通用申请')
    str = ` 
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>通用标题</div></td>
                    <td class="td"><div class='right'>${Data.General.Title}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>申请内容</div></td>
                     <td class="td"><div class='right'>${Data.General.Content}</div></td>
                 </tr>
              
                `
  } else if (k == 'ReimBursed') {
    var str1 = ``, str2 = ``
    // console.log('报销')
    var con = 0, s = '', s1
    for (let i = 0; i < Data.ReimBursed.length; i++) {
      var mun = Data.ReimBursed[i].Amount
      con += parseFloat(mun)
      if (i >= Data.ReimBursed.length - 1) {
        s += Data.ReimBursed[i].Details + ':' + Data.ReimBursed[i].Amount
        s1 += Data.ReimBursed[i].Categories
      } else {
        s += Data.ReimBursed[i].Details + ':' + Data.ReimBursed[i].Amount + ','
        s1 += Data.ReimBursed[i].Categories + ','
      }

      str2 += ` 
                
                <tr class="tr ">
                    <td class="td theTd">报销明细(${i + 1})</td>
                  
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>报销金额</div></td>
                     <td class="td"><div class='right'>${toDecimal2(Data.ReimBursed[i].Amount)}元</div></td>
                 </tr>
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>报销类型</div></td>
                     <td class="td"><div class='right'>${Data.ReimBursed[i].Categories}</div></td>
                 </tr>
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>费用明细</div></td>
                     <td class="td"><div class='right'>${Data.ReimBursed[i].Details}</div></td>
                 </tr>
              
                `
    }

    str1 = `
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>总金额</div></td>
                     <td class="td"><div class='right'>${toDecimal2(con)}元</div></td>
                 </tr>`
    str = `` + str1 + str2
  } else if (k == 'MaterialRequisition') {
    // console.log('物品领用');
    var Tstr = ''
    let str2 = ``
    var MaterialRequisition = Data.MaterialRequisition.List
    for (let i = 0; i < MaterialRequisition.length; i++) {
      if (i >= MaterialRequisition.length - 1) {
        Tstr += MaterialRequisition[i].Name
      } else {
        Tstr += MaterialRequisition[i].Name + '，'
      }
      str2 += ` 
                
                <tr class="tr">
                    <td class="td theTd">物品明细(${i + 1})</td>
                  
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>物品名称</div></td>
                     <td class="td"><div class='right'>${Data.MaterialRequisition.List[i].Name}</div></td>
                 </tr>
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>物品数量</div></td>
                     <td class="td"><div class='right'>${Data.MaterialRequisition.List[i].Count}</div></td>
                 </tr>
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>物品用途</div></td>
                     <td class="td"><div class='right'>${Data.MaterialRequisition.List[i].Use}</div></td>
                 </tr>
              
                `
    }
    const str1 = ` 
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>备注</div></td>
                     <td class="td"><div class='right'>${Data.MaterialRequisition.Remark}</div></td>
                 </tr>`

    str = str1 + str2
  } else if (k == 'ConTract') {
    // console.log('合同');

    let str2 = ``
    const str1 = ` 
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>合同类别</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.Category}</div></td>
                 </tr> 
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>合同编号</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.Number}</div></td>
                 </tr>`
    for (let i = 0; i < Data.ConTract.ContractContents.length; i++) {
      str2 += `
                <tr class="tr">
                     <td class="td theTd">${Data.ConTract.ContractContents[i].SubContractors}</td>
                     
                 </tr> 
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>单位名称</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.ContractContents[i].Organization}</div></td>
                 </tr>
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>经办部门</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.ContractContents[i].Department}</div></td>
                 </tr> 
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>经办人</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.ContractContents[i].Managers}</div></td>
                 </tr>
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>电话</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.ContractContents[i].Phone}</div></td>
                 </tr> 
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>邮件</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.ContractContents[i].Email}</div></td>
                 </tr>
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>传真</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.ContractContents[i].Fax}</div></td>
                 </tr> `
    }
    var str3 = ` 
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>合同内容</div></td>
                     <td class="td"><div class='right'>${Data.ConTract.Content}</div></td>
                 </tr>`

    str = str1 + str2 + str3
  } else if (k == 'Leave') {
    // console.log('请假')
    str = `                         
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>类型</div></td>
                    <td class="td"><div class='right'>${getLeaveType(Data.Leave.Type)}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>开始时间</div></td>
                    <td class="td"><div class='right'>${Data.Leave.Start}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>结束时间</div></td>
                    <td class="td"><div class='right'>${Data.Leave.End}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>请假天数</div></td>
                    <td class="td"><div class='right'>${Data.Leave.Days}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>请假理由</div></td>
                    <td class="td"><div class='right'>${Data.Leave.Reason}</div></td>
                 </tr>`
  } else if (k == 'Out') {
    // 外出
    str = ` 
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>开始时间</div></td>
                    <td class="td"><div class='right'>${Data.Out.Start}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>结束时间</div></td>
                     <td class="td"><div class='right'>${Data.Out.End}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>外出时长</div></td>
                    <td class="td"><div class='right'>${Data.Out.Days}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>外出地点</div></td>
                     <td class="td"><div class='right'>${Data.Out.Address}</div></td>
                 </tr>       
                 <tr class="tr">
                       <td class="td"><div class='left textCenter'">加班事由</div></td>
                       <td class="td"><div class='right'>${Data.Out.Reason}</span></div></td>
                  </tr>
                `
  } else if (k == 'Over') {
    // 加班
    str = ` 
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>开始时间</div></td>
                    <td class="td"><div class='right'>${Data.Over.Start}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>结束时间</div></td>
                     <td class="td"><div class='right'>${Data.Over.End}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>加班时长</div></td>
                    <td class="td"><div class='right'>${Data.Over.Days}</div></td>
                 </tr>   
                 <tr class="tr">
                       <td class="td"><div class='left textCenter'">加班事由</div></td>
                       <td class="td"><div class='right'>${Data.Over.Reason}</span></div></td>
                  </tr>
                `
  } else if (k == 'Reissue') {
    // 补卡
    let str1 = ``
    for (let i = 0; i < Data.Reissue.Sign.length; i++) {
      if (Data.Reissue.Sign[i].Count % 2 == 1) {
        str1 += `<span>签到补漏 （${Data.Reissue.Sign[i].SignTime}）</span>`
      } else {
        str1 += `<span> 签退补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      }
    }
    str = ` 
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>补漏时间</div></td>
                    <td class="td"><div class='right'>${Data.Reissue.Date}&nbsp; ${str1}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>补漏事由</div></td>
                     <td class="td"><div class='right'>${Data.Reissue.Reason}</div></td>
                 </tr>
              
                `
  } else if (k == 'Payment') {
    // console.log('付款')
    let str2 = ``
    const str1 = `
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>结算开始日期</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.Start}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>结算结束时间</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.End}</div></td>
                 </tr>
                  <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>总付款金额</div></td>
                     <td class ="td"><div class ='right'>${toDecimal2(Data.Payment.TotalPay)}元</div></td>
                 </tr>
                  <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>备注</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.Remark}</div></td>
                 </tr>`
    for (let i = 0; i < Data.Payment.PaymentDetails.length; i++) {
      str2 += `
                <tr class="tr">
                     <td class="td theTd">结算明细${i + 1}</td>

                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>往来单位名称</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.PaymentDetails[i].FirmName}</div></td>
                 </tr>
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>结算方式</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.PaymentDetails[i].PayType}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>付款金额</div></td>
                     <td class ="td"><div class ='right'>${toDecimal2(Data.Payment.PaymentDetails[i].PayAmount)}元</div></td>
                 </tr>
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>开户行</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.PaymentDetails[i].Bank}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>账号名称</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.PaymentDetails[i].BankAccount}</div></td>
                 </tr>
                <tr class="tr">
                     <td class="td"><div class='left textCenter'>开户地</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.PaymentDetails[i].BankAddress}</div></td>
                 </tr>
                  <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>说明</div></td>
                     <td class ="td"><div class ='right'>${Data.Payment.PaymentDetails[i].Remark}</div></td>
                 </tr> `
    }

    str = str1 + str2
  } else if (k == 'Purchase') {
    // console.log('采购')
    console.log(Data.Purchase)
    let str2 = ``
    const str1 = `
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>采购类型</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.PurchaseType}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>期望交付日期</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.End}</div></td>
                 </tr>
                  <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>采购事由</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.Reason}</div></td>
                 </tr>
                   <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>总数量</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.TotalAmount}</div></td>
                 </tr>
                   <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>总预算</div></td>
                     <td class ="td"><div class ='right'>${toDecimal2(Data.Purchase.TotalBudget)}元</div></td>
                 </tr>
                  <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>备注</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.Remark}</div></td>
                 </tr>`
    for (let i = 0; i < Data.Purchase.PurchaseDetails.length; i++) {
      str2 += `
                <tr class="tr">
                     <td class="td theTd">采购明细（${i + 1}）</td>

                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>货品名称</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.PurchaseDetails[i].Name}</div></td>
                 </tr>
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>数量</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.PurchaseDetails[i].Count}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>型号</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.PurchaseDetails[i].Version}</div></td>
                 </tr>
                  <tr class="tr">
                     <td class="td"><div class='left textCenter'>规格</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.PurchaseDetails[i].Norm}</div></td>
                 </tr>
                 <tr class="tr">
                     <td class="td"><div class='left textCenter'>采购预算</div></td>
                     <td class ="td"><div class ='right'>${toDecimal2(Data.Purchase.PurchaseDetails[i].Budget)}</div></td>
                 </tr>
              
                  <tr class ="tr">
                     <td class ="td"><div class ='left textCenter'>说明</div></td>
                     <td class ="td"><div class ='right'>${Data.Purchase.PurchaseDetails[i].Directions}</div></td>
                 </tr> `
    }

    str = str1 + str2
  } else if (k == 'Bill') {
    // console.log(Data.Bill)
    str = `
            <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>发票种类</div></td>
                    <td class ="td"><div class ='right'>${Data.Bill.BillType}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>开票抬头</div></td>
                    <td class ="td"><div class ='right'>${Data.Bill.BillName}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>开票金额</div></td>
                    <td class ="td"><div class ='right'>${toDecimal2(Data.Bill.End)}元</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>大写金额</div></td>
                    <td class ="td"><div class ='right'>${Data.Bill.CapitalAmount}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>发票内容</div></td>
                    <td class ="td"><div class ='right'>${Data.Bill.BillContent}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>税号</div></td>
                    <td class ="td"><div class ='right'>${Data.Bill.TaxNo}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>地址</div></td>
                    <td class="td"><div class='right'>${Data.Bill.Address}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>开户行</div></td>
                    <td class="td"><div class='right'>${Data.Bill.Bank}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>账号</div></td>
                    <td class="td"><div class='right'>${Data.Bill.BankAccount}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>备注</div></td>
                    <td class ="td"><div class ='right'>${Data.Bill.Remark}</div></td>
                 </tr>`
  } else if (k == 'EmpNeed') {
    // console.log(Data.Bill)
    str = `
            <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>需求部门</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpNeed.Dept}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>需求职位</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpNeed.Job}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>需求人数</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpNeed.Amount}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>申请原因</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpNeed.Reason}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>到岗日期</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpNeed.End}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>岗位描述</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpNeed.JobDescription}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>岗位要求</div></td>
                    <td class="td"><div class='right'>${Data.EmpNeed.Require}</div></td>
                 </tr>
               `
  } else if (k == 'EmpPositive') {
    // console.log(Data.EmpPositive)
    str = `
            <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>试用期岗位</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpPositive.Job}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>工号</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpPositive.EmpNo}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>转正类型</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpPositive.Type}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>入职日期</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpPositive.Start}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>试用月数</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpPositive.Months}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>工作总结</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpPositive.Summary}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>备注</div></td>
                    <td class="td"><div class='right'>${Data.EmpPositive.Remark}</div></td>
                 </tr>
               `
  } else if (k == 'EmpLeave') {
    str = `
            <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>任职岗位</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.Job}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>工号</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.EmpNo}</div></td>
                 </tr>
              
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>入职日期</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.Start}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>离职日期</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.End}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>离职原因</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.Reason}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>离职说明</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.Description}</div></td>
                 </tr>
                  <tr class="tr">
                    <td class="td"><div class='left textCenter'>物品交接</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.Goods}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>交接情况</div></td>
                    <td class ="td"><div class ='right'>${Data.EmpLeave.HandOver}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>备注</div></td>
                    <td class="td"><div class='right'>${Data.EmpLeave.Remark}</div></td>
                 </tr>
               `
  } else if (k == 'BusinessTrip') {
    str = `
            <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>开始时间</div></td>
                    <td class ="td"><div class ='right'>${Data.BusinessTrip.Start}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>结束时间</div></td>
                    <td class ="td"><div class ='right'>${Data.BusinessTrip.End}</div></td>
                 </tr>
              
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>合计时长</div></td>
                    <td class ="td"><div class ='right'>${Data.BusinessTrip.Days}</div></td>
                 </tr>
                <tr class ="tr">
                    <td class ="td"><div class ='left textCenter'>目的地</div></td>
                    <td class ="td"><div class ='right'>${Data.BusinessTrip.Destination}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>交通方式</div></td>
                    <td class ="td"><div class ='right'>${Data.BusinessTrip.Traffic}</div></td>
                 </tr>
                <tr class="tr">
                    <td class="td"><div class='left textCenter'>事由</div></td>
                    <td class ="td"><div class ='right'>${Data.BusinessTrip.Reason}</div></td>
                 </tr>
                  <tr class="tr">
                    <td class="td"><div class='left textCenter'>交接情况</div></td>
                    <td class ="td"><div class ='right'>${Data.BusinessTrip.Detail}</div></td>
                 </tr>
                
               `
  } else {
    str = '******此类型申请，格式正在调试中*****'
  }

  return str
}

// 申请详情  --基本信息
Vue.prototype.showContent = function(data) {
  var Data, k, content
  var str = ''
  if (data == '') {
    Data = ''
  } else {
    // Data = eval('(' + data + ')')
    Data = JSON.parse(data)
  }

  for (const key in Data) {
    k = key
  }

  // console.log(Data)

  if (k == 'ReimBursed') {
    var Con = 0

    var content_1 = ``

    for (let i = 0; i < Data.ReimBursed.length; i++) {
      Con += Data.ReimBursed[i].Amount
      content_1 += `
             <br/>
             <p><span class="color-32">报销明细(${i + 1})</span></p>
             <p><span class="color-8a">报销金额：</span><span class="color-8a">${toDecimal2(Data.ReimBursed[i].Amount)}元</span></p>
             <p><span class="color-8a">报销类别：</span><span class="color-8a">${Data.ReimBursed[i].Categories}</span></p>
             <p><span class="color-8a">报销明细：</span><span class="color-8a">${Data.ReimBursed[i].Details}</span></p>`
    }
    var content_0 = `<p><span class="color-32">报销总额：</span><span class="color-8a">${toDecimal2(Con)}元</span></p>`
    content = content_0 + content_1 + ``
  } else if (k == 'ConTract') {
    const content_0 = `
          <p><span class="color-32">合同编号：</span><span class="color-8a">${Data.ConTract.Number}</span></p>
          <p><span class="color-32">合同类型：</span><span class="color-8a">${Data.ConTract.Category}</span></p>
        `
    let content_1 = ``
    for (let i = 0; i < Data.ConTract.ContractContents.length; i++) {
      content_1 += `<br/>
                    <p><span class="color-32">签 订 方：</span><span class="color-8a">${Data.ConTract.ContractContents[i].SubContractors}</span></p>
                    <p><span class="color-32">单位名称：</span><span class="color-8a">${Data.ConTract.ContractContents[i].Organization}</span></p>
                    <p><span class="color-32">经办部门：</span><span class="color-8a">${Data.ConTract.ContractContents[i].Department}</span></p>
                    <p><span class="color-32">经  办 人：</span><span class="color-8a">${Data.ConTract.ContractContents[i].Managers}</span></p>
                  `
    }
    var content_2 = `
            <br/>
          <p><span class="color-32">合同内容：</span><span class="color-8a">${Data.ConTract.Content}</span></p>
          
        `
    content = content_0 + content_1 + content_2
  } else if (k == 'Leave') {
    content = `
                 <p><span class="color-32">请假类型：</span><span class="color-8a">${getLeaveType(Data.Leave.Type)}</span></p>
                    <p><span class="color-32">开始时间：</span><span class="color-8a">${Data.Leave.Start}</span></p>
                    <p><span class="color-32">结束时间：</span><span class="color-8a">${Data.Leave.End}</span></p>
                    <p><span class="color-32">请假天数：</span><span class="color-8a">${Data.Leave.Days}</span></p>
                    <p><span class="color-32">请假事由：</span><span class="color-8a">${Data.Leave.Reason}</span></p>
                `
  } else if (k == 'Over') {
    content = `
                
                    <p><span class="color-32">开始时间：</span><span class="color-8a">${Data.Over.Start}</span></p>
                    <p><span class="color-32">结束时间：</span><span class="color-8a">${Data.Over.End}</span></p>
                    <p><span class="color-32">合计时长：</span><span class="color-8a">${Data.Over.Days}</span></p>
                    <p><span class="color-32">加班事由：</span><span class="color-8a">${Data.Over.Reason}</span></p>
                `
  } else if (k == 'Out') {
    content = `
                
                    <p><span class="color-32">开始时间：</span><span class="color-8a">${Data.Out.Start}</span></p>
                    <p><span class="color-32">结束时间：</span><span class="color-8a">${Data.Out.End}</span></p>
                    <p><span class="color-32">外出时长：</span><span class="color-8a">${Data.Out.Days}</span></p>
                    <p><span class="color-32">外出地点：</span><span class="color-8a">${Data.Out.Address}</span></p>
                    <p><span class="color-32">加班事由：</span><span class="color-8a">${Data.Out.Reason}</span></p>
                `
  } else if (k == 'MaterialRequisition') {
    let content_0 = '', content_1 = ''
    content_0 = ` <p><span class="color-32">备 &nbsp; &nbsp;&nbsp;&nbsp; 注：</span><span class="color-8a">${Data.MaterialRequisition.Remark}</span></p>`
    for (let i = 0; i < Data.MaterialRequisition.List.length; i++) {
      content_1 += `
            <br/>
             <p><span class="color-32">物品明细(${i + 1})</span></p>
             <p><span class ="color-8a">物品名称：</span><span class="color-8a">${Data.MaterialRequisition.List[i].Name}</span></p>
             <p><span class ="color-8a">物品数量：</span><span class="color-8a">${Data.MaterialRequisition.List[i].Count}</span></p>
            
             <p><span class="color-8a">物品用途：</span><span class="color-8a">${Data.MaterialRequisition.List[i].Use}</span></p>
              `
    }

    content = content_0 + content_1
  } else if (k == 'General') {
    // console.log(Data.General)
    content = `  <p><span class="color-32">申请标题：</span><span class="color-8a">${Data.General.Title}</span></p>
                    <p><span class="color-32">申请内容：</span><span class="color-8a">${Data.General.Content}</span></p>`
  } else if (k == 'Reissue') {
    // console.log('补卡')

    var str1 = ``, str2 = ``
    for (let i = 0; i < Data.Reissue.Sign.length; i++) {
      if (Data.Reissue.Sign[i].Count == 1) {
        str1 += ` <span style="margin-left:40px">签到补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      } else if (Data.Reissue.Sign[i].Count == 2) {
        str1 += ` <span style="margin-left:40px"> 签退补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      } else if (Data.Reissue.Sign[i].Count == 3) {
        str2 += `<span style="margin-left:40px">签退补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      } else if (Data.Reissue.Sign[i].Count == 4) {
        str2 += `<span style="margin-left:40px"> 签退补漏（${Data.Reissue.Sign[i].SignTime}）</span>`
      }
    }

    content = `  <p><span class="color-32">补漏时间：</span><span class="color-8a">${Data.Reissue.Date}</span></p>
                    <p style="margin-left:40px"><span class="color-8a">${str1}</span></p>
                    <p style="margin-left:40px"><span class="color-8a">${str2}</span></p>
                    <p><span class="color-32">事由：</span><span class="color-8a">${Data.Reissue.Reason}</span></p>
                    `
  } else if (k == 'Payment') {
    let str1 = ``
    for (let i = 0; i < Data.Payment.PaymentDetails.length; i++) {
      str1 += ` <br/>
             <p><span class="color-32">结算明细(${i + 1})</span></p>
             <p><span class ="color-8a">往来单位名称：</span><span class="color-8a">${Data.Payment.PaymentDetails[i].FirmName}</span></p>
             <p><span class ="color-8a">结算方式：</span><span class="color-8a">${Data.Payment.PaymentDetails[i].PayType}</span></p>
             <p><span class ="color-8a">付款金额：</span><span class="color-8a">${toDecimal2(Data.Payment.PaymentDetails[i].PayAmount)}元</span></p>
             <p><span class ="color-8a">开户行：</span><span class="color-8a">${Data.Payment.PaymentDetails[i].BankAccount}</span></p>
             <p><span class ="color-8a">账号名称：</span><span class="color-8a">${Data.Payment.PaymentDetails[i].Bank}</span></p>
             <p><span class ="color-8a">开户地：</span><span class="color-8a">${Data.Payment.PaymentDetails[i].BankAddress}</span></p>
             <p><span class ="color-8a">说明：</span><span class="color-8a">${Data.Payment.PaymentDetails[i].Remark}</span></p>`
    }
    content = `  
                    <p><span class ="color-32">结算开始日期：</span><span class="color-8a">${Data.Payment.Start}</span></p>
                    <p><span class ="color-32">结算结束时间：</span><span class="color-8a">${Data.Payment.End}</span></p>   
                    <p><span class ="color-32">总付款金额：</span><span class="color-8a">${toDecimal2(Data.Payment.TotalPay)}元</span></p>
                    <p><span class ="color-32">备注：</span><span class="color-8a">${Data.Payment.Remark}</span></p>
                  ${str1}
                    `
  } else if (k == 'Purchase') {
    let str1 = ``
    for (let i = 0; i < Data.Purchase.PurchaseDetails.length; i++) {
      str1 += ` <br/>
             <p><span class="color-32">采购明细(${i + 1})</span></p>
             <p><span class ="color-8a">货品名称：</span><span class="color-8a">${Data.Purchase.PurchaseDetails[i].Name}</span></p>
             <p><span class ="color-8a">数量：</span><span class="color-8a">${Data.Purchase.PurchaseDetails[i].Count}</span></p>
             <p><span class ="color-8a">型号：</span><span class="color-8a">${Data.Purchase.PurchaseDetails[i].Version}</span></p>
              <p><span class ="color-8a">规格：</span><span class="color-8a">${Data.Purchase.PurchaseDetails[i].Norm}</span></p>
               <p><span class ="color-8a">采购预算：</span><span class="color-8a">${toDecimal2(Data.Purchase.PurchaseDetails[i].Budget)}元</span></p>
                <p><span class ="color-8a">说明：</span><span class="color-8a">${Data.Purchase.PurchaseDetails[i].Directions}</span></p>`
    }
    content = `  <p><span class="color-32">采购类型：</span><span class="color-8a">${Data.Purchase.PurchaseType}</span></p>
                    <p><span class ="color-32">期望交付日期：</span><span class="color-8a">${Data.Purchase.End}</span></p>
                    <p><span class ="color-32">采购事由：</span><span class="color-8a">${Data.Purchase.Reason}</span></p>
                    <p><span class ="color-32">总数量：</span><span class="color-8a">${Data.Purchase.TotalAmount}</span></p>
                    <p><span class ="color-32">总预算：</span><span class="color-8a">${toDecimal2(Data.Purchase.TotalBudget)}元</span></p>
                    <p><span class ="color-32">备注：</span><span class="color-8a">${Data.Purchase.Remark}</span></p>
                  
                  ${str1}
                   
                    `
  } else if (k == 'Bill') {
    content = `  <p><span class="color-32">发票种类：</span><span class="color-8a">${Data.Bill.BillType}</span></p>
                    <p><span class ="color-32">发票抬头：</span><span class="color-8a">${Data.Bill.BillName}</span></p>
                    <p><span class ="color-32">开票金额：</span><span class="color-8a">${toDecimal2(Data.Bill.BillAmount)}元</span></p>
                    <p><span class ="color-32">大写金额：</span><span class="color-8a">${Data.Bill.CapitalAmount}</span></p>
                    <p><span class ="color-32">发票内容：</span><span class="color-8a">${Data.Bill.BillContent}</span></p>                   
                    <p><span class ="color-32">税号：</span><span class="color-8a">${Data.Bill.TaxNo}</span></p>
                    <p><span class ="color-32">地址：</span><span class="color-8a">${Data.Bill.Address}</span></p>
                    <p><span class ="color-32">开户行：</span><span class="color-8a">${Data.Bill.Bank}</span></p>
                    <p><span class ="color-32">账号：</span><span class="color-8a">${Data.Bill.BankAccount}</span></p>
                    <p><span class ="color-32">备注：</span><span class="color-8a">${Data.Bill.Remark}</span></p>

                    `
  } else if (k == 'EmpNeed') {
    content = `  <p><span class="color-32">需求部门：</span><span class="color-8a">${Data.EmpNeed.Dept}</span></p>
                    <p><span class ="color-32">需求岗位：</span><span class="color-8a">${Data.EmpNeed.Job}</span></p>
                    <p><span class ="color-32">需求人数：</span><span class="color-8a">${Data.EmpNeed.Amount}</span></p>
                    <p><span class ="color-32">申请原因：</span><span class="color-8a">${Data.EmpNeed.Reason}</span></p>
                    <p><span class ="color-32">到岗日期：</span><span class="color-8a">${Data.EmpNeed.End}</span></p>                   
                    <p><span class ="color-32">岗位描述：</span><span class="color-8a">${Data.EmpNeed.JobDescription}</span></p>
                    <p><span class ="color-32">岗位要求：</span><span class="color-8a">${Data.EmpNeed.Require}</span></p>
                    `
  } else if (k == 'EmpPositive') {
    content = `  <p><span class="color-32">试用期岗位：</span><span class="color-8a">${Data.EmpPositive.Job}</span></p>
                    <p><span class ="color-32">工号：</span><span class="color-8a">${Data.EmpPositive.EmpNo}</span></p>
                    <p><span class ="color-32">转正类型：</span><span class="color-8a">${Data.EmpPositive.Type}</span></p>
                    <p><span class ="color-32">入职日期：</span><span class="color-8a">${Data.EmpPositive.Start}</span></p>
                    <p><span class ="color-32">试用期月数：</span><span class="color-8a">${Data.EmpPositive.Months}</span></p>                   
                    <p><span class ="color-32">工作总结：</span><span class="color-8a">${Data.EmpPositive.Summary}</span></p>
                    <p><span class ="color-32">备注：</span><span class="color-8a">${Data.EmpPositive.Remark}</span></p>
                    `
  } else if (k == 'EmpLeave') {
    content = `  <p><span class="color-32">任职岗位：</span><span class="color-8a">${Data.EmpLeave.Job}</span></p>
                    <p><span class ="color-32">工号：</span><span class="color-8a">${Data.EmpLeave.EmpNo}</span></p>                  
                    <p><span class ="color-32">入职日期：</span><span class="color-8a">${Data.EmpLeave.Start}</span></p>
                    <p><span class ="color-32">离职日期：</span><span class="color-8a">${Data.EmpLeave.End}</span></p>                   
                    <p><span class ="color-32">离职原因：</span><span class="color-8a">${Data.EmpLeave.Reason}</span></p>
                    <p><span class ="color-32">原因说明：</span><span class="color-8a">${Data.EmpLeave.Description}</span></p>
                    <p><span class ="color-32">物品交接：</span><span class="color-8a">${Data.EmpLeave.Goods}</span></p>
                    <p><span class ="color-32">交接情况：</span><span class="color-8a">${Data.EmpLeave.HandOver}</span></p>
                    <p><span class ="color-32">备注：</span><span class="color-8a">${Data.EmpLeave.Remark}</span></p>
                  `
  } else if (k == 'BusinessTrip') {
    content = `  <p><span class="color-32">开始时间：</span><span class="color-8a">${Data.BusinessTrip.Start}</span></p>
                    <p><span class ="color-32">结束时间：</span><span class="color-8a">${Data.BusinessTrip.End}</span></p>                  
                    <p><span class ="color-32">合计时长：</span><span class="color-8a">${Data.BusinessTrip.Days}</span></p>
                    <p><span class ="color-32">目的地：</span><span class="color-8a">${Data.BusinessTrip.Destination}</span></p>                   
                    <p><span class ="color-32">交通方式：</span><span class="color-8a">${Data.BusinessTrip.Traffic}</span></p
                    <p><span class ="color-32">事由：</span><span class="color-8a">${Data.BusinessTrip.Reason}</span></p>
                    <p><span class ="color-32">交接情况：</span><span class="color-8a">${Data.BusinessTrip.Detail}</span></p>
                  
                  `
  } else {
    content = `调试中。。。`
  }

  return content
}

// 申请详情  审批--状态
Vue.prototype.StatusValue = function(data) {
  if (data == 5) {
    return `applyStatusValue-pass`
  } else if (data == 4) {
    return `applyStatusValue-back`
  } else if (data == 2) {
    return `applyStatusValue-no`
  } else if (data == 6) {
    // 未通过
    return `applyStatusValue-noPass`
  } else {
    return ``
  }
}

Vue.filter('setStatusColor', function(data) {
  if (data == 5 || data == 7) {
    return 'color-green'
  } else if (data == 2 || data == 6) {
    return 'color-red'
  } else if (data == 4) {
    return 'color-8a'
  } else if (data == 1) {
    return 'color-yello'
  }
})
Vue.filter('setStatusText', function(data) {
  if (data == 5) {
    return '通过'
  } else if (data == 2) {
    return '拒绝'
  } else if (data == 6) {
    return '未通过'
  } else if (data == 4) {
    return '已撤销'
  }
})

Vue.filter('setApprovalStatus', function(data) {
  if (data == 5) {
    return '同意并通过'
  } else if (data == 2) {
    return '拒绝'
  } else if (data == 6) {
    return '未通过'
  } else if (data == 4) {
    return '已撤销'
  } else if (data == 7) {
    return '同意并转交'
  }
})
// '2017-12-15 08:45:12'--->' 08:45:12'
Vue.filter('dataTogetTime', function(data) {
  if (data) {
    return data.split(' ')[1]
  } else {
    return data
  }
})

// 56432分---->1小时10分
Vue.filter('TimeLength', function(time) {
  if (time) {
    time = time.split('分')[0]
    var Time = ''
    if (time < 60) {
      Time = time + '分钟'
    } else if (time >= 60) { // time < 1440
      Time = fomatFloat((time / 60), 1) + '小时'
    }
    // else if (time < 525600) {
    //    Time = fomatFloat((time / (60 * 24)), 1) + '天';
    // } else {
    //    Time = fomatFloat(time / (60 * 24 * 365), 1) + '年';
    // }
    return Time
  }

  function fomatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos)
  }
})

Vue.prototype.setApprovalStatus = function(data) {
  if (data == 1) {
    return '<span class="color-yello">审批中</span>'
  } else if (data == 2) {
    return '<span class="color-red">已拒绝</span>'
  } else if (data == 6) {
    return '<span class="color-red">审批未通过</span>'
  } else if (data == 5) {
    return '<span class="color-green">同意并通过</span>'
  } else if (data == 3) {
    return '<span class="color-yollo">越级审批中</span>'
  } else if (data == 7) {
    return '<span class="color-green">同意并转交</span>'
  }
}
Vue.prototype.ApprovalStatus = function(data) {
  if (data == 4) {
    return '<span class="color-red">拒绝</span>'
  } else if (data == 2) {
    return '<span class="color-green">同意并通过</span>'
  } else if (data == 3) {
    return '<span class="color-green">同意并转交</span>'
  }
}

Vue.prototype.fileType = function(item) {
  var strI = '',
    bgColor = '', Ftype = ''
  var gzys = [
    // 视频
    {
      'mp4': 'video', 'avi': 'video', '3gp': 'video', 'rmvb': 'video', 'rm': 'video', 'wmv': 'video', 'mkv': 'video', 'mpeg': 'video', 'mpg': 'video', 'vob': 'video',
      'mov': 'video', 'swf': 'video', 'flv': 'video', 'f4v': 'video', 'dat': 'video', 'VCD': 'video', 'drc': 'video', 'dsm': 'video', 'dsv': 'video', 'dsa': 'video', 'dss': 'video',
      'ifo': 'video', 'd2v': 'video', 'fli': 'video', 'flc': 'video', 'lic': 'video', 'ivf': 'video', 'mpe': 'video', 'mtv': 'video', 'm1v': 'video', 'm2v': 'video', 'mpv2': 'video',
      'mp2v': 'video', 'ts': 'video', 'tp': 'video', 'tpr': 'video', 'pva': 'video', 'pss': 'video', 'm4v': 'video', 'm4p': 'video', 'm4b': 'video', '3gpp': 'video', '3g2': 'video',
      '3gp2': 'video', 'ogm': 'video', 'qt': 'video', 'amr': 'video', 'ratdvd': 'video', 'rt': 'video', 'rp': 'video', 'smi': 'video', 'smil': 'video', 'amv': 'video', 'dmv': 'video',
      'navi': 'video', 'ra': 'video', 'ram': 'video', 'rpm': 'video', 'roq': 'video', 'smk': 'video', 'bik': 'video', 'wmp': 'video', 'wm': 'video', 'asf': 'video', 'asx': 'video',
      'm3u': 'video', 'pls': 'video', 'wvx': 'video', 'wax': 'video', 'wmx': 'video', 'mpcpl': 'video', 'mpeg4': 'video', 'mpg4': 'video', 'mpeg1': 'video',
      'mpg1': 'video', 'mpeg2': 'video', 'mpg2': 'video'
    },
    // 音乐
    {
      'mp3': 'music', 'wma': 'music', 'flac': 'music', 'aac': 'music', 'mmf': 'music', 'amr': 'music', 'm4a': 'music', 'm4r': 'music',
      'Ogg': 'music', 'wav': 'music', 'wavpack': 'music', 'wave': 'music', 'au': 'music', 'CD': 'music',
      'ra': 'music', 'ogg': 'music', 'mpc': 'music', 'ape': 'music', 'ac3': 'music', 'mpa': 'music', 'mp2': 'music',
      'm1a': 'music', 'm2a': 'music', 'mid': 'music', 'midi': 'music', 'rmi': 'music', 'mka': 'music', 'dts': 'music', 'cda': 'music',
      'snd': 'music', 'aif': 'music', 'aifc': 'music', 'aiff': 'music', 'ofr': 'music', 'realAudio': 'music', 'vqf': 'music'
    },
    // word
    { 'doc': 'word', 'docx': 'word', 'txt': 'word', 'pdf': 'word' },
    // excle
    { 'xls': 'excle', 'xlsx': 'excle' },
    // ppt
    { 'ppt': 'ppt', 'pptx': 'ppt', 'pps': 'ppt', 'ppsx': 'ppt' },
    // 压缩文件
    {
      'rar': 'compressed', 'zip': 'compressed', 'tar': 'compressed', 'cab': 'compressed', 'uue': 'compressed', 'jar': 'compressed',
      'iso': 'compressed', 'z': 'compressed', '7-zip': 'compressed', 'ace': 'compressed', 'lzh': 'compressed', 'arj': 'compressed',
      'gzip': 'compressed', 'bz2': 'compressed'
    },
    // img
    {
      'bmp': 'img', 'jpeg': 'img', 'trff': 'img', 'png': 'img', 'svg': 'img', 'pcx': 'img', 'dxf': 'img', 'wmf': 'img', 'emf': 'img',
      'lic': 'img', 'jpg': 'img', 'tga': 'img', 'gif': 'img', 'brr': 'img'
    }

    // 其他
  ]
  // console.log(gzys[1].mp3);

  var numLast = item.split(/[.]/).length - 1
  var format = item.split(/[.]/)[numLast]

  // console.log(item.Name);
  for (let i = 0; i < gzys.length; i++) {
    for (const key in gzys[i]) {
      if (key == format) {
        Ftype = gzys[i][key]
      }
    }
  }

  if (Ftype == 'video') {
    // 视频
    // color = '&#xe691;'; bgColor = '#fc9448';
    strI = '<i class="iconfont filetype" style="color: #fc9448;">&#xe691;</i>'
  } else if (Ftype == 'music') {
    // 音乐
    // color = ''; bgColor = '#f4be3a';
    strI = '<i class="iconfont filetype" style="color: #f4be3a;">&#xe64d;</i>'
  } else if (Ftype == 'word') {
    // word
    // color = '&#xe642;'; bgColor = '#6199f3';
    strI = '<i class="iconfont filetype" style="color: #6199f3;">&#xe642;</i>'
  } else if (Ftype == 'excle') {
    // excle
    // color = '&#xe641;'; bgColor = '#4cca8e';
    strI = '<i class="iconfont filetype" style="color: #4cca8e;">&#xe641;</i>'
  } else if (Ftype == 'ppt') {
    // ppt
    // color = '&#xe640;'; bgColor = '#f25f60';
    strI = '<i class="iconfont filetype" style="color: #f25f60;">&#xe640;</i>'
  } else if (Ftype == 'compressed') {
    // 压缩文件
    // color = '&#xe64c;'; bgColor = '#9b8ab7';
    strI = '<i class="iconfont filetype" style="color: #9b8ab7;">&#xe64c;</i>'
  } else {
    // color = '&#xe64b;'; bgColor = '#a1ae9a';
    strI = '<i class="iconfont filetype" style="color: #a1ae9a;">&#xe64b;</i>'
  }

  return strI
}

Vue.filter('fileSize', function(size) {
  var Fsize
  var sizeNum = size / 1024
  if (sizeNum == 0) {
    Fsize = '-'
  } else if (sizeNum > 0 && sizeNum < 999.9) {
    Fsize = sizeNum.toFixed(1) + 'KB'
  } else if (sizeNum > 999.999 && sizeNum < 1048576) {
    Fsize = (sizeNum / 1024).toFixed(1) + 'MB'
  } else {
    Fsize = (sizeNum / 1048576).toFixed(1) + 'GB'
  }
  return Fsize
})
Vue.filter('TimeSize', function(size) {

})
Vue.filter('GetType', function(data) {
  // var aaa = JSON.parse(data);
  // var aaa = (new Function("return " + str))();
  // console.log(aaa)
  if (data) {
    var Data, k
    var str = ''
    if (data == '') {
      Data = ''
    } else {
      // Data = eval('(' + data + ')')
      Data = JSON.parse(data)
    }
    // console.log(Data)
    for (const key in Data) {
      k = key
    }
    // console.log(k)
    if (k == 'Leave') {
      return getLeaveType(Data.Leave.Type)
    } else if (k == 'ConTract') {
      return Data.ConTract.Category
    } else if (k == 'ReimBursed') {
      return Data.ReimBursed[0].Categories
    } else if (k == 'Payment') {
      return ''
    } if (k == 'EmpPositive') {
      return Data.EmpPositive.Type
    } else {
      return ''
    }
  }
})
Vue.filter('setClass', function(data) {
  // console.log(data)
  if (data == '合同') {
    return 'type_icon_ConTract'
  } else if (data == '请假') {
    return 'type_icon_Leave'
  } else if (data == '报销') {
    return 'type_icon_ReimBursed'
  } else if (data == '物品领用') {
    return 'type_icon_MaterialRequisition'
  } else if (data == '通用审批' || data == '通用') {
    return 'type_icon_General'
  } else if (data == '外出') {
    return 'type_icon_Out'
  } else if (data == '出差') {
    return 'type_icon_BusinessTrip'
  } else if (data == '加班') {
    return 'type_icon_Overtime'
  } else if (data == '补卡') {
    return 'type_icon_reissue'
  } else if (data == '采购') {
    return 'type_icon_Buyer'
  } else if (data == '付款') {
    return 'type_icon_payment'
  } else if (data == '开票') {
    return 'type_icon_billing'
  } else if (data == '人员需求') {
    return 'type_icon_personnelRequirement'
  } else if (data == '员工转正') {
    return 'type_icon_regularization'
  } else if (data == '员工离职') {
    return 'type_icon_leaveOffice'
  } else if (data == '领料') {
    return 'type_icon_Picking'
  }
})

Vue.filter('GetTime', function(inTime) {
  if (inTime) {
    var Time = parseInt(inTime.split('(')[1].split(')')[0])

    if (new Date(Time).getHours() < 10) {
      var hours = '0' + new Date(Time).getHours()
    } else {
      hours = new Date(Time).getHours()
    }
    if (new Date(Time).getMinutes() < 10) {
      var minutes = '0' + new Date(Time).getMinutes()
    } else {
      minutes = new Date(Time).getMinutes()
    }
    if (new Date(Time).getSeconds() < 10) {
      var seconds = '0' + new Date(Time).getSeconds()
    } else {
      seconds = new Date(Time).getSeconds()
    }
    var theMonth = parseInt(new Date(Time).getMonth()) + 1
    var theDate = new Date(Time).getDate()
    if (theMonth < 10) {
      theMonth = '0' + theMonth
    }
    if (theDate < 10) {
      theDate = '0' + theDate
    }
    var FTime = new Date(Time).getFullYear() + '-' + theMonth + '-' + theDate + ' ' + hours + ':' + minutes
  }
  return FTime
})

// 数组截取
Vue.prototype.toGetList = function(data, n1, n2) {
  return data.slice(n1, n2)
}

// 申请列表-摘要
Vue.filter('toTrunString', function(data) {
  var Data, k
  var str = ''
  if (data == '') {
    Data = ''
  } else {
    // Data = eval('(' + data + ')')
    Data = JSON.parse(data)
  }

  for (const key in Data) {
    k = key
  }

  if (k == 'General') {
    // console.log('通用申请')
    str = '【' + Data.General.Title + '】'
  } else if (k == 'ReimBursed') {
    // console.log('报销')
    str = '【报销】'
    var con = 0, s = ''
    for (let i = 0; i < Data.ReimBursed.length; i++) {
      var mun = Data.ReimBursed[i].Amount
      // console.log(mun)
      con += parseFloat(mun)
      s += Data.ReimBursed[i].Categories + ':' + Data.ReimBursed[i].Amount + ','
    }
    str = str + ' ' + con + ';' + s
  } else if (k == 'MaterialRequisition') {
    str = '【物品领用】'
    // console.log(Data.MaterialRequisition.List);
    var MaterialRequisition = Data.MaterialRequisition.List

    for (let i = 0; i < MaterialRequisition.length; i++) {
      str += MaterialRequisition[i].Name + '*' + MaterialRequisition[i].Count + ' '
    }
  } else if (k == 'ConTract') {
    // console.log('合同');
    str = '【合同】' + ' ' + Data.ConTract.Category + ',' + Data.ConTract.Number
  } else if (k == 'Leave') {
    // console.log('请假');
    str = '【请假】' + getLeaveType(Data.Leave.Type) + ',' + Data.Leave.Start + '至' + Data.Leave.End
  } else if (k == 'Out') {
    // console.log('外出');
    str = '【外出】' + Data.Out.Days + '天,' + Data.Out.Reason
  } else if (k == 'Over') {
    // console.log('加班');
    str = '【加班】' + Data.Over.Start + '至' + Data.Over.End
  } else if (k == 'Reissue') {
    // console.log('补漏打卡');
    var Time = ''
    for (let i = 0; i < Data.Reissue.Sign.length; i++) {
      Time += Data.Reissue.Sign[i].SignTime + ' '
    }
    str = '【补卡】' + Data.Reissue.Date + ' ' + Time + ',' + Data.Reissue.Reason
  } else if (k == 'Payment') {
    // console.log(Data.Payment)
    str = '【付款】' + Data.Payment.TotalPay + '元' + ',' + Data.Payment.End
  } else if (k == 'Purchase') {
    str = '【采购】' + Data.Purchase.PurchaseType + ',总数量：' + Data.Purchase.TotalAmount + ',总预算' + Data.Purchase.TotalBudget + '元'
  } else if (k == 'Bill') {
    str = '【开票】' + Data.Bill.BillName + ',' + Data.Bill.BillAmount + '元'
  } else if (k == 'EmpNeed') {
    str = '【人员需求】' + Data.EmpNeed.Job + '*' + Data.EmpNeed.Amount
  } else if (k == 'EmpPositive') {
    str = '【员工转正】 试用期岗位：' + Data.EmpPositive.Job + '，试用期月数：' + Data.EmpPositive.Months + '月'
  } else if (k == 'EmpLeave') {
    str = '【员工离职】 任职岗位：' + Data.EmpLeave.Job + '，' + Data.EmpLeave.Reason
  } else if (k == 'BusinessTrip') {
    str = '【出差】' + Data.BusinessTrip.Reason
  } else {
    str = '******此类型申请，格式正在开发调试中*****'
  }

  return str
})

// 请假类型判断
function getLeaveType(twistStr) {
  var typeName
  if (twistStr == 1) {
    typeName = '年假'
  } else if (twistStr == 2) {
    typeName = '事假'
  } else if (twistStr == 3) {
    typeName = '病假'
  } else if (twistStr == 4) {
    typeName = '调休'
  } else if (twistStr == 5) {
    typeName = '婚假'
  } else if (twistStr == 6) {
    typeName = '产假'
  } else if (twistStr == 7) {
    typeName = '陪产假'
  } else if (twistStr == 8) {
    typeName = '路途假'
  } else if (twistStr == 9) {
    typeName = '其他'
  } else {
    typeName = twistStr
  }
  return typeName
}

function format(data, x, y) {
  var s
  if (data) {
    s = data.replace('{0}', x).replace('{1}', y).replace('{2}', 'c')
    return s
  }
};

// 头像Url
Vue.filter('faceUrl', function(data, w) {
  if (data) {
    var img = window.imgapiurl + format(data, w, w)
    return img
  }
})
// 语音window.imgapiurl
Vue.filter('videoUrl', function(data) {
  if (data) {
    return window.imgapiurl + data
  }
})
// /var timel =new Date().format("yyyy-MM-dd HH:mm:ss");
// Date.prototype.formatT = function(fmt) { // author: meizz
//   var o = {
//     'M+': this.getMonth() + 1, // 月份
//     'd+': this.getDate(), // 日
//     'h+': this.getHours(), // 小时
//     'm+': this.getMinutes(), // 分
//     's+': this.getSeconds(), // 秒
//     'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
//     'S': this.getMilliseconds() // 毫秒
//   }
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
//   for (let k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
//   return fmt
// }

