import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestService } from './request/request.service';
import { API_URL_TOKEN } from './request.token';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RequestModule {
  public static forRoot(apiUrl: string): ModuleWithProviders {
    return {
      ngModule: RequestModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestService, multi: true },
        { provide: API_URL_TOKEN, useValue: apiUrl},
      ]
    };
  }
}
