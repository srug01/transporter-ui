"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyTripsFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var error_matcher_1 = require("src/app/shared/matchers/error.matcher");
var statusEnum_1 = require("../../../shared/Enum/statusEnum");
var MyTripsFormComponent = /** @class */ (function () {
    function MyTripsFormComponent(_ngZone, fb, _snackBar, _tripService, _router, _userService, _vehicleService, _driverService) {
        this._ngZone = _ngZone;
        this.fb = fb;
        this._snackBar = _snackBar;
        this._tripService = _tripService;
        this._router = _router;
        this._userService = _userService;
        this._vehicleService = _vehicleService;
        this._driverService = _driverService;
        this.matcher = new error_matcher_1.FormErrorStateMatcher();
        this.drivers = [];
        this.vehicles = [];
        this.userId = localStorage.getItem('userID');
    }
    MyTripsFormComponent.prototype.ngOnInit = function () {
        this.getUserInfo();
        this.getAllDrivers();
        this.getAllVehicles();
        if (this.tripData[0]) {
            this.tripForm = this.fb.group({
                tripId: [this.tripData[0].tripId ? this.tripData[0].tripId : ''],
                subOrderId: [this.tripData[0].subOrderId ? this.tripData[0].subOrderId : '', forms_1.Validators.required],
                sourceId: [this.tripData[0].sourceId ? this.tripData[0].sourceId : ''],
                destinationId: [this.tripData[0].destinationId ? this.tripData[0].destinationId : ''],
                assignedVehicle: [this.tripData[0].assignedVehicle ? this.tripData[0].assignedVehicle : 0],
                assignedDriver: [this.tripData[0].assignedDriver ? this.tripData[0].assignedDriver : 0],
                tripstatus: [this.tripData[0].tripstatus ? this.tripData[0].tripstatus : ''],
                tripStatusId: [this.tripData[0].tripStatusId ? this.tripData[0].tripStatusId : ''],
                billedAmount: [this.tripData[0].billedAmount ? this.tripData[0].billedAmount : ''],
                isActive: [this.tripData[0].isActive ? this.tripData[0].isActive : ''],
                createdBy: [this.tripData[0].createdBy ? this.tripData[0].createdBy : ''],
                createdOn: [this.tripData[0].createdOn ? this.tripData[0].createdOn : ''],
                modifiedBy: [this.tripData[0].modifiedBy ? this.tripData[0].modifiedBy : ''],
                modifiedOn: [this.tripData[0].modifiedOn ? this.tripData[0].modifiedOn : ''],
                startDate: [this.tripData[0].startDate ? this.tripData[0].startDate : ''],
                endDate: [this.tripData[0].endDate ? this.tripData[0].endDate : ''],
                sourceName: [this.tripData[0].sourceName ? this.tripData[0].sourceName : '', forms_1.Validators.required],
                destinationName: [this.tripData[0].destinationName ? this.tripData[0].destinationName : '', forms_1.Validators.required],
                vehicleNumber: [this.tripData[0].vehicleNumber ? this.tripData[0].vehicleNumber : '']
            });
        }
        else {
            this.tripForm = this.fb.group({
                tripId: [''],
                subOrderId: ['', forms_1.Validators.required],
                sourceId: [''],
                destinationId: [''],
                assignedVehicle: [''],
                assignedDriver: [''],
                tripstatus: [''],
                tripStatusId: [''],
                billedAmount: [''],
                isActive: [''],
                createdBy: [''],
                createdOn: [''],
                modifiedBy: [''],
                modifiedOn: [''],
                startDate: [''],
                endDate: [''],
                sourceName: ['', forms_1.Validators.required],
                destinationName: ['', forms_1.Validators.required],
                vehicleNumber: ['']
            });
        }
    };
    MyTripsFormComponent.prototype.getAllVehicles = function () {
        var _this = this;
        this._vehicleService.getAllVehiclesbyUserId(this.userId).subscribe(function (vehicles) {
            _this.vehicles = vehicles;
        }, function (err) {
            console.log(err);
        });
    };
    MyTripsFormComponent.prototype.getAllDrivers = function () {
        var _this = this;
        this._driverService.getAllDriversbyUserId(this.userId).subscribe(function (drivers) {
            _this.drivers = drivers;
        }, function (err) {
            console.log(err);
        });
    };
    MyTripsFormComponent.prototype.getUserInfo = function () {
        var _this = this;
        this._userService.getUsersInfo().subscribe(function (loggedUser) {
            _this.currentUser = loggedUser;
        });
    };
    MyTripsFormComponent.prototype.transformTripObj = function (trip) {
        return {
            tripId: trip.tripId,
            subOrderId: trip.subOrderId,
            sourceId: trip.sourceId,
            destinationId: trip.destinationId,
            assignedVehicle: trip.assignedVehicle,
            assignedDriver: trip.assignedDriver,
            tripstatus: "",
            tripStatusId: 0,
            billedAmount: 0,
            isActive: trip.isActive,
            createdBy: trip.createdBy ? trip.createdBy : this.currentUser.userId,
            createdOn: new Date(),
            modifiedBy: trip.modifiedBy ? trip.modifiedBy : this.currentUser.userId,
            modifiedOn: new Date(),
            startDate: new Date(),
            endDate: new Date()
        };
    };
    MyTripsFormComponent.prototype.submittripForm = function (ev) {
        if (ev) {
            ev.preventDefault();
        }
        if (this.tripForm.valid) {
            var trip = this.transformTripObj(this.tripForm.value);
            if (trip.assignedDriver > 0 && (trip.assignedVehicle == 0 || trip.assignedVehicle == null)) {
                trip.tripstatus = 'TRIP_DRIVER_ASSIGNED';
                trip.tripStatusId = statusEnum_1.StausEnum.TRIP_DRIVER_ASSIGNED;
            }
            else if (trip.assignedVehicle > 0 && (trip.assignedDriver == 0 || trip.assignedDriver == null)) {
                trip.tripstatus = 'TRIP_VEHICLE_ASSIGNED';
                trip.tripStatusId = statusEnum_1.StausEnum.TRIP_VEHICLE_ASSIGNED;
            }
            else {
                trip.tripstatus = 'TRIP_DRIVER_VEHICLE_ASSIGNED';
                trip.tripStatusId = statusEnum_1.StausEnum.TRIP_DRIVER_VEHICLE_ASSIGNED;
            }
            this.updateTripMaster(trip);
        }
        else {
            this.openSnackBar('Invalid Form !', 'Please review all fields');
        }
    };
    MyTripsFormComponent.prototype.updateTripMaster = function (trip) {
        var _this = this;
        this._tripService.updateMytripMaster(trip).subscribe(function (res) {
            _this.openSnackBar('Success !', 'Trip Master Updated Successfully');
            _this._router.navigate(['/default/transporter/my-trips/list']);
        }, function (err) {
            console.log('err');
            _this.openSnackBar('Failure !', 'Could not update Trip Master!');
        });
    };
    MyTripsFormComponent.prototype.openSnackBar = function (message, action) {
        this._snackBar.open(message, action, {
            duration: 2000
        });
    };
    __decorate([
        core_1.Input('tripData')
    ], MyTripsFormComponent.prototype, "tripData");
    MyTripsFormComponent = __decorate([
        core_1.Component({
            selector: 'app-my-trips-form',
            templateUrl: './my-trips-form.component.html',
            styleUrls: ['./my-trips-form.component.scss']
        })
    ], MyTripsFormComponent);
    return MyTripsFormComponent;
}());
exports.MyTripsFormComponent = MyTripsFormComponent;
