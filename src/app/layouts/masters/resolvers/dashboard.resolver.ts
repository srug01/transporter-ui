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
            const userId = + localStorage.getItem('userID');
            return this.dashboardService.getAdminDashboardbyUserId(userId);
    }
}
