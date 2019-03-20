import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@/services';
import { IUser } from '@/model';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  public user: IUser = {};

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/store']);
  }
}