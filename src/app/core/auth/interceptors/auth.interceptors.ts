import {HttpInterceptorFn} from "@angular/common/http";
import { SESSION } from "../../../shared/constants/session.constants";
import { Session } from "../interfaces/auth.interfaces";

export const authInterceptor:HttpInterceptorFn = (req, next) => {
    const storage = SESSION.getLocalStorage
    const session: Session = storage ? JSON.parse(storage) : ''

    const authReq = req.clone({
        setHeaders:{
            Autorization: `Bearer ${session.token}`
        }
    });
    return next(authReq);
  }