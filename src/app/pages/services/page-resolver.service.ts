import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface IResolvedData {
  imageURL: string;
  title: string;
}

@Injectable()
export class PageResolverService implements Resolve<IResolvedData> {

  constructor() {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IResolvedData> {

    const param = route.paramMap.get('id');

    return new Observable(observer => {
      observer.next({ imageURL: `/assets/images/${param}.jpg`, title: `Reused Route (${param})` });
      observer.complete();
    });
  }

}
