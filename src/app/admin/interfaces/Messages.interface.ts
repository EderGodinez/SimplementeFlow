export interface Message{
  _id:string
  username:string
  status:string
  UserEmail:string
  issue:string
  Content:string
  MessageDate:Date
}
export interface MessageDto{
  username:string,
    UserEmail:string,
    issue:string,
    Content:string
}
