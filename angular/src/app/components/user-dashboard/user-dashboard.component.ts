import { Component, OnInit } from '@angular/core';
import { AuthService } from '@/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@/model';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  public user: IUser = {};
  public activeTab: string;

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

  handleTabChange(tab: MatTabChangeEvent) {
    this.activeTab = tab.tab.textLabel;
  }

}
