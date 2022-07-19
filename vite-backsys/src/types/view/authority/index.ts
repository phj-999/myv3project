export interface authorityInt {
  name: string
  roleId: number
  roleList?: authorityInt[]
  viewRole?: string
}

export class InitAuthorityData {
  id: number
  authority: number[]
  constructor(id: number, authority: number[]) {
    this.id = id
    this.authority = authority
  }
  authorityList: authorityInt[] = []
  //treeRef: any
}
