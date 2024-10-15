import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { AuthorComponent } from './author/author.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './services/guard.guard'
import { EditArticleComponent } from './edit-article/edit-article.component';
// const routes: Routes = [
//   { path: 'author/:id', component: AuthorComponent },
//   { path: 'article/:id', component: ArticleDetailsComponent },

//   { path: '', pathMatch: 'full', redirectTo: '/home' },



//   { path: 'about', component: AboutComponent },
//   { path: 'dashboard', component: DashboardComponent },

//   { path: 'create-article', component: CreateArticleComponent },
//   { path: 'articles', component: ArticlesComponent },

//   { path: 'article/:id', component: ArticleDetailsComponent },

//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },


//   { path: 'privacy', component: PrivacyComponent },

//   {
//     path: '', component: HomeComponent,
//     children: [
//       { path: 'home', component: HomeComponent },
//       { path: 'home/articles', component: ArticlesComponent },
//       // { path: 'home/article/:id', component: ArticleDetailsComponent },
//     ]
//   },

//   { path: '**', component: NotfoundComponent } // Redirect to home for unrecognized routes

// ];

const routes: Routes = [
  { path: 'author/login', component: LoginComponent },
  { path: 'author/logout', component: LoginComponent },

  { path: 'author/:id', component: AuthorComponent },
  { path: 'article/all', component: ArticlesComponent },
  { path: 'edit-article/:id', component: EditArticleComponent },

  { path: 'article/:id', component: ArticleDetailsComponent },


  { path: 'about', component: AboutComponent },
  { path: 'create-article', component: CreateArticleComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy', component: PrivacyComponent },

  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'articles', component: ArticlesComponent },
      // { path: 'article/:id', component: ArticleDetailsComponent }, // Uncomment if needed
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  { path: '**', component: NotfoundComponent } // Redirect to 404 for unrecognized routes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
