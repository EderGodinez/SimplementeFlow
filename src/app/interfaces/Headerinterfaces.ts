export interface socialMedia{
  logo:string
  url:string
}
export interface UserOptions{
  icon:string
  url:string
  label:string
}
export const social:socialMedia[]=[
  {
    logo:'pi pi-facebook',
    url:'https://www.facebook.com/',
  },
  {
    logo:'pi pi-instagram',
    url:'https://www.instagram.com/',
  },
  {
    logo:'pi pi-twitter',
    url:'https://www.twitter.com/',
  },
  {
    logo:'pi pi-youtube',
    url:'https://www.youtube.com/',
  }
]
export const UserOp:UserOptions[]=[
  {
    icon:'bi bi-person-circle',
    url:'Account',
    label:'Mi cuenta'
  },
  {
    icon:'bi bi-box2',
    url:'Orders',
    label:'Mis pedidos'
  },
  {
    icon:'bi bi-question',
    url:'Return-policity',
    label:'Devoluciones'
  },
  {
    icon:'bi bi-chat-left-dots',
    url:'Contact',
    label:'Contacto'
  }
]
