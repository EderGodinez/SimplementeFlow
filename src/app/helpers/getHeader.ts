import { HttpHeaders } from "@angular/common/http";

export const getUserAutorizationHeaders=()=>{
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${ token }`);
    return headers
}
