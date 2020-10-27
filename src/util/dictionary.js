import { each } from 'lodash'
// 帮助文档类型

/**
 * 将数组转换为map，生成的key
 * @param arr 源数组
 * @param k 转换后的map的key取的源字段
 * @param v 转换后的map的value取的源字段
 */
export function arr2map(arr, k = 'value', v = 'name') {
  let m = {}
  each(arr, (item) => {
    m[item[k]] = item[v]
  })
  return m
}
export const goodsType = [
  { value: '01', name: '甜品类' },
  { value: '02', name: '餐饮类' },
  { value: '03', name: '酒店住宿类' },
  { value: '04', name: '摄影类' },
  { value: '05', name: '生活家居类' },
  { value: '06', name: '医疗类' },
  { value: '07', name: '少儿培训' },
  { value: '08', name: '休闲娱乐类' },
  { value: '09', name: '果蔬类' },
  { value: '10', name: '美容美发' },
  { value: '11', name: '运动、健身类' },
  { value: '13', name: '饰品类' },
  { value: '12', name: '其他' }
]
export const assetsStatus = [
  { value: '1', name: '使用中' },
  { value: '2', name: '未分配' },
  { value: '3', name: '已归还，无问题' },
  { value: '4', name: '已归还，已破损' },
  { value: '5', name: '已归还，已报废' },
  { value: '6', name: '正常报废' },
  { value: '7', name: '未归还' },
  { value: '8', name: '待确认' },
  { value: '9', name: '已变卖' }
]
assetsStatus.mapType = arr2map(assetsStatus)

export const userStatus = [
  { value: 0, name: '全部' },
  { value: 1, name: '试用' },
  { value: 2, name: '正式' },
  { value: 3, name: '离职' }
]
export const purchaseStatus = [
  { value: 1, name: '未请款' },
  { value: 2, name: '已请款' },
  { value: 3, name: '采购完成' }
]
purchaseStatus.mapType = arr2map(purchaseStatus)

// 付款账号类型
export const payAccountTypes = [
  {
    value: 1,
    name: '对私账户'
  },
  {
    value: 2,
    name: '对公账户'
  },
  {
    value: 3,
    name: '微信'
  },
  {
    value: 4,
    name: '支付宝'
  }
]
payAccountTypes.typeMap = arr2map(payAccountTypes)
