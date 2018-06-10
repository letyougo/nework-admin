import request from './request'

const url = {
  sysuser: {
    list: "/sysUser/listUserWithRole",
    detail: '',
    post: '',
    update: '',
    remove: ''
  },
  role: {
    list: "/sysRole/listRoleWithPerm",
    detail: '',
    post: '/sysRole/addRole/',
    update: '/sysRole/updateRole',
    remove: '/sysRole/deleteRole'
  },
  per: {
    list: "/sysPermission/listPermissionByParam",
    detail: '',
    post: '',
    update: '',
    remove: ''
  },

  log:{
    list:'/optLog/listLogByParam'
  },


  service: {
    list:'/service/listServiceByParam',
    update:'/service/updateService',
    post:'/service/addService',
    remove:'/service/deleteService'
  }
}


export default {
  //district
  'sysuser': {
    list: () => request.get(url.sysuser.list),
  },
  'role': {
    list: () => request.get(url.role.list),
    update: (obj) => request.post(url.role.update, obj),
    post: (obj) => request.post(url.role.post, obj),
    remove: (obj) => request.post(url.role.remove, obj)
  },
  'per': {
    list: () => request.get(url.per.list),
  },
  service:{
    list:(obj)=>request.get(url.service.list,{params:obj}),
    update: (obj) => request.post(url.service.update, obj),
    post: (obj) => request.post(url.service.post, obj),
    remove:(obj)=>request.get(url.service.remove,{params:obj})
  },
  log:{
    list:(obj)=>request.get(url.log.list,{params:obj})
  }

}
