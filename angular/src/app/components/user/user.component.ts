import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '@/services';
import { UserService } from '@/services/user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        
      }
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/store']);
  }
}