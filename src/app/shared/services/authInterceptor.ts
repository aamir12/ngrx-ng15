import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { PersistanceService } from "./persistance.service";
import { AuthToken } from "../constant";

export const authInterceptor : HttpInterceptorFn = (request,next) => {
    const persistance = inject(PersistanceService);
    const token = persistance.get(AuthToken);
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Token ${token}` : ''
        }
    })

    return next(request);
}