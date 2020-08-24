"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleRegistrationFormComponent = void 0;
var error_matcher_1 = require("./../../../shared/matchers/error.matcher");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var forms_1 = require("@angular/forms");
var VehicleRegistrationFormComponent = /** @class */ (function () {
    function VehicleRegistrationFormComponent(_ngZone, fb, _snackBar, _vehicleService, _router, _stateService, _containerservice, _weightservice, _userService) {
        this._ngZone = _ngZone;
        this.fb = fb;
        this._snackBar = _snackBar;
        this._vehicleService = _vehicleService;
        this._router = _router;
        this._stateService = _stateService;
        this._containerservice = _containerservice;
        this._weightservice = _weightservice;
        this._userService = _userService;
        this.matcher = new error_matcher_1.FormErrorStateMatcher();
        // public vehicleTypes: Array<any> = [
        //   { value: '10 FT', viewValue: '10 FT' },
        //   { value: '20 FT', viewValue: '20 FT' },
        //   { value: '30 FT', viewValue: '30 FT' }
        // ];
        // public vehicleCapacity: Array<any> = [
        //   { value: '1 TON', viewValue: '1 TON' },
        //   { value: '2 TON', viewValue: '2 TON' },
        //   { value: '3 TON', viewValue: '3 TON' }
        // ];
        // public weight: Array<any> = [];
        this.manufactureYear = [];
        this.owned = false;
    }
    VehicleRegistrationFormComponent.prototype.getUserInfo = function () {
        var _this = this;
        this._userService.getUsersInfo().subscribe(function (loggedUser) {
            _this.currentUser = loggedUser;
        });
    };
    VehicleRegistrationFormComponent.prototype.ngOnInit = function () {
        this.getAllStates();
        this.getAllContainer();
        this.getAllWeight();
        this.getUserInfo();
        if (this.vehicleMasterData) {
            this.vehicleForm = this.fb.group({
                vehicleMasterId: [this.vehicleMasterData.vehicleMasterId ?
                        this.vehicleMasterData.vehicleMasterId : ''],
                vehicleNumber: [this.vehicleMasterData.vehicleNumber ? this.vehicleMasterData.vehicleNumber : '',
                    forms_1.Validators.required],
                vehicleType: [this.vehicleMasterData.vehicleType ? this.vehicleMasterData.vehicleType : '',
                    forms_1.Validators.required],
                vehicleCapacity: [this.vehicleMasterData.vehicleCapacity ? this.vehicleMasterData.vehicleCapacity : '',
                    forms_1.Validators.required],
                weight: [this.vehicleMasterData.weight ? this.vehicleMasterData.weight : '',
                    forms_1.Validators.required],
                manufactureYear: [this.vehicleMasterData.manufactureYear ? this.vehicleMasterData.manufactureYear : '',
                    forms_1.Validators.required],
                stateId: [this.vehicleMasterData.stateId ? this.vehicleMasterData.stateId : '',
                    forms_1.Validators.required],
                owned: [this.vehicleMasterData.owned ? this.vehicleMasterData.owned : '',
                    forms_1.Validators.required],
                isActive: ['', forms_1.Validators.required]
            });
        }
        else {
            this.vehicleForm = this.fb.group({
                vehicleMasterId: [''],
                vehicleNumber: ['', forms_1.Validators.required],
                vehicleType: ['', forms_1.Validators.required],
                vehicleCapacity: ['', forms_1.Validators.required],
                weight: ['', forms_1.Validators.required],
                manufactureYear: ['', forms_1.Validators.required],
                stateId: ['', forms_1.Validators.required],
                owned: [''],
                isActive: ['', forms_1.Validators.required]
            });
        }
    };
    VehicleRegistrationFormComponent.prototype.getAllWeight = function () {
        var _this = this;
        this._weightservice.getAllWeightMasters().subscribe(function (weight) {
            _this.weight = weight;
        }, function (err) {
        });
    };
    VehicleRegistrationFormComponent.prototype.transformVehicleRegistrationObj = function (vehicle) {
        return {
            vehicleMasterId: vehicle.vehicleMasterId ? vehicle.vehicleMasterId : 0,
            vehicleNumber: vehicle.vehicleNumber,
            vehicleType: vehicle.vehicleType,
            vehicleCapacity: vehicle.vehicleCapacity,
            weight: vehicle.weight,
            manufactureYear: vehicle.manufactureYear,
            stateId: vehicle.stateId,
            owned: vehicle.owned,
            createdBy: this.currentUser.userId,
            modifiedBy: this.currentUser.userId,
            createdOn: new Date(),
            modifiedOn: new Date(),
            isActive: vehicle.isActive
        };
    };
    VehicleRegistrationFormComponent.prototype.getAllContainer = function () {
        var _this = this;
        this._containerservice.getAllContainerMasters().subscribe(function (containers) {
            _this.containers = containers;
        }, function (err) {
        });
    };
    VehicleRegistrationFormComponent.prototype.getAllStates = function () {
        var _this = this;
        this._stateService.getAllStateMasters().subscribe(function (states) {
            _this.states = states;
        }, function (err) {
        });
    };
    VehicleRegistrationFormComponent.prototype.triggerResize = function () {
        var _this = this;
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(operators_1.take(1))
            .subscribe(function () { return _this.autosize.resizeToFitContent(true); });
    };
    VehicleRegistrationFormComponent.prototype.findInvalidControls = function () {
        var invalid = [];
        var controls = this.vehicleForm.controls;
        for (var name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    };
    VehicleRegistrationFormComponent.prototype.submitVehicleForm = function (ev) {
        // this.findInvalidControls();
        if (ev) {
            ev.preventDefault();
        }
        if (this.vehicleForm.valid) {
            var vehicle = this.transformVehicleRegistrationObj(this.vehicleForm.value);
            if (!this.vehicleMasterData) {
                console.log(vehicle);
                this.saveVehicleMaster(vehicle);
            }
            else {
                this.updateVehicleMaster(vehicle);
            }
        }
        else {
            this.openSnackBar('Invalid Form !', 'Please review all fields');
            console.log(this.vehicleForm);
        }
    };
    VehicleRegistrationFormComponent.prototype.saveVehicleMaster = function (vehicleForm) {
        var _this = this;
        this._vehicleService.saveVehicleMaster(vehicleForm).subscribe(function (res) {
            _this.openSnackBar('Success !', 'Vehicle Master Created Successfully');
            _this._router.navigate(['/default/transporter/register-vehicle/list']);
        }, function (err) {
            console.log(err);
            if (err.error.error.code === 'ER_DUP_ENTRY') {
                _this.openSnackBar('Failure !', 'Duplicate Vehicle Number Specified');
            }
            else {
                _this.openSnackBar('Failure !', 'Could not create vehicle');
            }
        });
    };
    VehicleRegistrationFormComponent.prototype.updateVehicleMaster = function (vehicleForm) {
        var _this = this;
        this._vehicleService.updateVehicleMaster(vehicleForm).subscribe(function (res) {
            _this.openSnackBar('Success !', 'Vehicle Master Updated Successfully');
            _this._router.navigate(['/default/transporter/register-vehicle/list']);
        }, function (err) {
            console.log('err');
            _this.openSnackBar('Failure !', 'Could not create vehicle');
        });
    };
    VehicleRegistrationFormComponent.prototype.openSnackBar = function (message, action) {
        this._snackBar.open(message, action, {
            duration: 2000
        });
    };
    __decorate([
        core_1.Input('vehiclemasterData')
    ], VehicleRegistrationFormComponent.prototype, "vehicleMasterData");
    __decorate([
        core_2.ViewChild('autosize')
    ], VehicleRegistrationFormComponent.prototype, "autosize");
    VehicleRegistrationFormComponent = __decorate([
        core_1.Component({
            selector: 'app-vehicle-registration-form',
            templateUrl: './vehicle-registration-form.component.html',
            styleUrls: ['./vehicle-registration-form.component.scss']
        })
    ], VehicleRegistrationFormComponent);
    return VehicleRegistrationFormComponent;
}());
exports.VehicleRegistrationFormComponent = VehicleRegistrationFormComponent;
