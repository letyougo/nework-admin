import request from './request'
const url = {
    sysuser:{
        list: "/sysUser/listUserWithRole",
        detail:'',
        post:'',
        update:'',
        remove:''
    },
    role:{
        list:"/sysRole/listRoleWithPerm",
        detail:'',
        post:'',
        update:'',
        remove:''
    },
    per:{
        list: "/sysPermission/listPermissionByParam",
        detail:'',
        post:'',
        update:'',
        remove:''
    }
}


export default {
    //district 
    'sysuser':{
        list:()=>request.get(url.sysuser.list),
    },
    'role':{
        list:()=>request.get(url.role.list)
    },
    'per':{
        list:()=>request.get(url.per.list),
    },
   
}