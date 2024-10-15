import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SelectComponent } from './shared/components/select/select.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuthorComponent } from './author/author.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ArticlesComponent } from './articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@ngx-auth/core';
import { EditArticleComponent } from './edit-article/edit-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    AboutComponent,
    ArticleDetailsComponent,
    LoginComponent,
    RegisterComponent, SpinnerComponent, SelectComponent, PrivacyComponent, AuthorComponent, CreateArticleComponent, NotfoundComponent, ArticlesComponent, EditArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, RouterModule, ReactiveFormsModule, CommonModule, FontAwesomeModule
    , NgxPaginationModule, LazyLoadImageModule, HttpClientModule, AuthModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
