"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyTripsEditComponent = void 0;
var core_1 = require("@angular/core");
var MyTripsEditComponent = /** @class */ (function () {
    function MyTripsEditComponent(route, _tripService) {
        this.route = route;
        this._tripService = _tripService;
    }
    MyTripsEditComponent.prototype.ngOnInit = function () {
        this.tripData = this.route.snapshot.data['tripResolver'];
    };
    MyTripsEditComponent = __decorate([
        core_1.Component({
            selector: 'app-my-trips-edit',
            templateUrl: './my-trips-edit.component.html',
            styleUrls: ['./my-trips-edit.component.scss']
        })
    ], MyTripsEditComponent);
    return MyTripsEditComponent;
}());
exports.MyTripsEditComponent = MyTripsEditComponent;
