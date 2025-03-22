import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { protectionGuard } from './protection.guard';
import { preferCatGuard } from './prefer-cat.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent, canActivate: [protectionGuard, preferCatGuard] },
  { path: 'dog', component: DogComponent, canActivate: [protectionGuard] },
  { path: 'home', component: HomeComponent, canActivate: [protectionGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
