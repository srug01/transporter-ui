import { Dashboard } from './../../../shared/models/dashboard';
import { Cfs } from './../../../shared/models/cfs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CfsService } from '../services/cfs.service';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

export class DashboardStats {
    dashboard: any;
    orderCount: any;
    suborderCount: any;
    bidCount: any;
    tripCount: any;
    orders: any;
    suborders: any;
    bids: any;
    trips: any;
}

@Injectable()
export class DashboardResolver implements Resolve<Dashboard>{
    currentUser: User;
    dashboardStats: DashboardStats = new DashboardStats();

    constructor(
        private dashboardService: DashboardService,
        private _userService: UserService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<DashboardStats> | Promise<DashboardStats> | DashboardStats | any {
            const roleId = parseInt(localStorage.getItem('roleID'),10);
            const userId = parseInt(localStorage.getItem('userID'), 10);
            if(roleId == 1)
            {
              return this.dashboardService.getAdminDashboardbyUserId(userId);
            }
            else if(roleId == 4 || roleId == 7 || roleId == 8 || roleId == 9)
            {
              return this.dashboardService.getCFSDashboardbyUserId(userId);
            }
            else if(roleId == 5)
            {
              return this.dashboardService.getTransporterDashboardbyUserId(userId);
            }
            else if(roleId == 6)
            {
              return this.dashboardService.GetDriverDashboardbyUserId(userId);
            }

    }
}
