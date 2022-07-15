interface RoleInt {
  role: number
  roleName: string
}
//用户信息列表
export interface userListInit {
  id: number
  nickName: string
  role: RoleInt
}
//用于查询
interface selectedDataInt {
  role: number
  nickName: string
}

//角色列表
export interface roleListInit {
  authority: number[]
  roleId: number
  roleName: string
}

export class InitData {
  selectedData: selectedDataInt = {
    role: 0,
    nickName: ''
  }
  list: userListInit[] = [] //接受用户信息的列表
  roleList: roleListInit[] = [] //角色列表
}
