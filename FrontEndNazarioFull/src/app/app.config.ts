import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { InterceptorService } from './interceptor/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    },
    provideRouter(routes), 
    provideHttpClient()]
};
