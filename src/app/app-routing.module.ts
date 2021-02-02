import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectFeedbackComponent } from './project/project-feedback/project-feedback.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      {
        path: 'projectFeedback',
        component: ProjectFeedbackComponent,
      },
      {
        path: 'projectFeedback/:id',
        component: ProjectFeedbackComponent,
      },
      {
        path: 'projectList',
        component: ProjectListComponent,
      },
      {
        path: '',
        redirectTo: 'projectList',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
