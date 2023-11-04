import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { UsPageComponent } from './pages/us-page/us-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { PrimeModule } from './prime/prime.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialResposabilityComponent } from './pages/social-resposability/social-resposability.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReturnPageComponent } from './pages/return-page/return-page.component';
import { LegalNoticePageComponent } from './pages/legal-notice-page/legal-notice-page.component';
import { FindUsPageComponent } from './pages/find-us-page/find-us-page.component';
import { ProductsModule } from './products/products.module';
import { ValidatorService } from './validators/validator.service';
import { CommonModule, registerLocaleData } from '@angular/common';

//cambiar idioma por defecto
import localeEsMx from '@angular/common/locales/es-MX';
registerLocaleData(localeEsMx)
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NewUserPageComponent,
    CheckoutPageComponent,
    FavoritesPageComponent,
    UsPageComponent,
    ContactPageComponent,
    HeaderComponent,
    FooterComponent,
    LayoutPageComponent,
    VerifyAccountComponent,
    SuccessPageComponent,
    ErrorPageComponent,
    RegisterPageComponent,
    SocialResposabilityComponent,
    LoginPageComponent,
    ReturnPageComponent,
    LegalNoticePageComponent,
    FindUsPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimeModule,
    FormsModule,
    AngularMaterialModule,
    ProductsModule
  ],
  providers: [ValidatorService,
      {provide:LOCALE_ID,useValue:'es-MX'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
