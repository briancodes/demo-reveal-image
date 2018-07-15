import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './containers/home-page.component';
import { PageResolverService } from './services/page-resolver.service';

const routes: Routes = [
  {
    path: 'page1',
    component: HomePageComponent,
    data: { resolvedData: {imageURL: '/assets/images/forest.jpg', title: 'Page One' }}
  },
  {
    path: 'page2',
    component: HomePageComponent,
    data: { resolvedData: {imageURL: '/assets/images/cliffs.jpg', title: 'Page Two'}}
  },
  {
    path: 'reuse/:id',
    component: HomePageComponent,
    resolve: {resolvedData: PageResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PageResolverService]
})
export class PagesRoutingModule { }
