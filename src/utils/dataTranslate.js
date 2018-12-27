
import Vue from 'vue'

function DataTransfer(data) {
  if (!(this instanceof DataTransfer)) {
    return new DataTransfer(data, null, null)
  }
}

DataTransfer.treeToArray = function(data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.ChildList && record.ChildList.length > 0) {
      const children = DataTransfer.treeToArray(record.ChildList, record, _level, expandedAll)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}

DataTransfer.treeToArrayforChildrens = function(data, parent, level, expandedAll) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandedAll)
    }
    if (parent) {
      Vue.set(record, '_parent', parent)
    }
    let _level = 0
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    tmp.push(record)
    if (record.Childrens && record.Childrens.length > 0) {
      const children = DataTransfer.treeToArrayforChildrens(record.Childrens, record, _level, expandedAll)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
export default DataTransfer
