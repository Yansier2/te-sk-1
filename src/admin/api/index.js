import request from '@/utils/request.js'

export function authLogin(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
export function categoryList() {
  return request({
    url: '/sys/product/category/list'
  })
}
export function categoryTree() {
  return request({
    url: '/sys/product/category/tree'
  })
}
export function operateProduct(data) {
  return request({
    url: '/sys/product/item/update',
    method: data.goodsId ? 'post' : 'post',
    data
  })
}
export function updloadfilepic(data) {
  // 图片上传
  return request({
    url: '/sys/config/uploadImage',
    method: 'post',
    data: {
      file: data
    }
  })
}
export function saveitem(data) {
  // 图片上传
  return request({
    url: '/sys/product/item/save',
    method: 'post',
    data
  })
}
export function updateByKey(data) {
  // 更新首页控制数据
  return request({
    url: '/system/config/updateByKey',
    method: 'post',
    data: {
      configKey: "homePage",
      configValue: data
    }
  })
}
export function homePage() {
  // 查询首页控制数据
  return request({
    url: '/system/config/homePage',
    method: 'get',
  })
}
export function linkpageget() {
  // 查询联系方式
  return request({
    url: '/system/config/contactInformation',
    method: 'get',
  })
}
export function linkpagechange(data) {

  // 修改联系方式
  return request({
    url: '/system/config/updateByKey',
    method: 'post',
    data: {
      configKey: "contactInformation",
      configValue: data
    }
  })
}
export function deleteProduct(id) {
  return request({
    url: `/sys/product/item/${id}`,
    method: 'delete'
  })
}
export function productDetail(id) {
  return request({
    url: `/sys/product/item/${id}`,
  })
}
export function updateCategory(data) {
  return request({
    url: '/sys/product/category',
    method: 'put',
    data
  })
}
