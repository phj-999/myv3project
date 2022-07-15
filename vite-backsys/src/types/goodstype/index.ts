export interface ListInt {
  userId: number
  id: number
  title: string
  introduce: string
}

interface selectDataInt {
  title: string
  introduce: string
  page: number
  count: number //总条数
  pagesize: number //每页默认显示条数
}

export class InitData {
  list: ListInt[] = []
  selectData: selectDataInt = {
    title: '',
    introduce: '',
    page: 1,
    count: 0, //总条数
    pagesize: 10 //每页默认显示条数
  }
}
