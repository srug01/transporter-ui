import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map, mergeMap } from 'rxjs/internal/operators';

interface linkDetails {
  url: string,
  label: string
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const path = this.router.url.replace('/child', '');
    if (path) {
      this.createRouterLinks(path);
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        let snapshot = this.router.routerState.snapshot;
        let routeData = route.snapshot.data;  
        const path2 = this.router.url.replace('/child', '');
        this.createRouterLinks(path2);
      });
  }

  createRouterLinks(path: string) {
    this.breadcrumbs = [];
    const links = path.split('/');
    links.forEach(link => {
      this.breadcrumbs.push(this.returnLinkDetails(link));
    });
  }

  returnLinkDetails(link) {
    const details: linkDetails = {
      label: '',
      url: ''
    };
    switch (link) {
      case 'default':
        details.label = 'Home';
        details.url = '/default';
        break;
      case 'cfs':
        details.label = 'cfs';
        details.url = '/default/cfs/order-list';
        break;
      case 'create-order':
        details.label = 'create-order';
        details.url = '/default/cfs/create-order';
        break;
      case 'order-list':
        details.label = 'order-list';
        details.url = '/default/cfs/order-list';
        break;
      case 'register-user':
        details.label = 'register-user';
        details.url = '/default/cfs/register-user';
        break;
      case 'user-list-edit':
        details.label = 'user-list-edit';
        details.url = '/default/cfs/user-list-edit';
      case 'user-list':
        details.label = 'user-list';
        details.url = '/default/cfs/user-list';
        break;
      case 'transporter':
        details.label = 'transporter';
        details.url = '/transporter';
        break;
      case 'register-vehicle':
        details.label = 'register-vehicle';
        details.url = '/default/transporter/register-vehicle';
        break;
      case 'vehicle-list':
        details.label = 'vehicle-list';
        details.url = '/default/transporter/register-vehicle/vehicle-list';
        break;
      case 'register-transporter':
        details.label = 'register-transporter';
        details.url = '/default/transporter/register-transporter';
        break;
      case 'transporter-list':
        details.label = 'transporter-list';
        details.url = '/default/transporter/transporter-list';
        break;
      case 'bids':
        details.label = 'bids';
        details.url = '/default/transporter/bids';
        break;
      case 'masters':
        details.label = 'masters';
        details.url = '';
        break;
      case 'cfs-port-rate-list':
        details.label = 'cfs-port-rate-list';
        details.url = '/default/masters/cfs-port-rate/cfs-port-rate-list';
        break;
      case 'cfs-port-rate':
        details.label = 'cfs-port-rate';
        details.url = '/default/masters/cfs-port-rate/cfs-port-rate-list';
        break;
      case 'yardcfsrate':
        details.label = 'yardcfsrate';
        details.url = '/default/masters/yardcfsrate/list';
        break;
      case 'yardcfsratelist':
        details.label = 'yardcfsratelist';
        details.url = '/default/masters/yardcfsrate/yardcfsratelist';
        break;
      case 'cfs-yard-rate':
        details.label = 'cfs-yard-rate';
        details.url = '/default/masters/cfs-yard-rate/cfs-yard-rate-list';
        break;
      case 'cfs-yard-rate-list':
        details.label = 'cfs-yard-rate-list';
        details.url = '/default/masters/cfs-yard-rate/cfs-yard-rate-list';
        break;
      case 'diesel':
        details.label = 'diesel';
        details.url = '/default/masters/diesel/diesel-list';
        break;
      case 'diesel-list':
        details.label = 'diesel-list';
        details.url = '/default/masters/diesel/diesel-list';
        break;
      case 'location':
        details.label = 'location';
        details.url = '/default/masters/location/location-list';
        break;
      case 'location-list':
        details.label = 'location-list';
        details.url = '/default/masters/location/location-list';
        break;
      case 'bids':
        details.label = 'bids';
        details.url = '/default/transporter/bids';
        break;
      case 'port':
        details.label = 'port';
        details.url = '/default/masters/port/port-list';
        break;
      case 'port-list':
        details.label = 'port-list';
        details.url = '/default/transporter/bids';
        break;
      default:
        break;
    }
    return details;
  }

}