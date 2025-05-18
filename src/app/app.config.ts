import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // if using Angular Material

export const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule) // if you use material components
  ]
};
