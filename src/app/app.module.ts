import { NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { SocialResposabilityComponent } from './pages/social-resposability/social-resposability.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';

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
    WhatsappComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimeModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
