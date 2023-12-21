export interface ChartsResponse{
  userStats:UserData[]
  salesStats:SaleData[]
}
interface SaleData{
  month: number,
  totalSales: any
}
interface UserData{
  month: number,
  totalUsers: any
}
