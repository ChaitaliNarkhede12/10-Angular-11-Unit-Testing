"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var employee_service_1 = require("../../app/service/employee.service");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
fdescribe('AuthenticationService', function () {
    var employeeService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule],
            declarations: [],
            providers: [employee_service_1.EmployeeService, http_1.HttpClient]
        });
        employeeService = testing_1.TestBed.get(employee_service_1.EmployeeService);
    });
    fit('should be created', function () {
        expect(employeeService).toBeTruthy();
    });
    fit('Should return response from getEmployeelist', testing_1.inject([employee_service_1.EmployeeService, http_1.HttpClient], function (employeeService, httpClient) {
        var responseTemp = [
            {
                "empId": 1,
                "empName": "Chaitali narkhede",
                "empEmailId": "chaitali.narkhede@gmail.com",
                "empaddress": "Pune"
            }
        ];
        spyOn(httpClient, 'get').and.returnValue(rxjs_1.of(responseTemp));
        employeeService.getEmployeelist().subscribe(function (response) {
            expect(responseTemp.length).toEqual(response.length);
        });
    }));
    fit('Should return response from getEmployeeById', testing_1.inject([employee_service_1.EmployeeService, http_1.HttpClient], function (employeeService, httpClient) {
        var responseTemp = [
            {
                "empId": 1,
                "empName": "Chaitali narkhede",
                "empEmailId": "chaitali.narkhede@gmail.com",
                "empaddress": "Pune"
            }
        ];
        spyOn(httpClient, 'get').and.returnValue(rxjs_1.of(responseTemp));
        employeeService.getEmployeeById(1).subscribe(function (response) {
            expect(responseTemp.length).toEqual(response.length);
        });
    }));
    fit('Should return response from saveEmployee', testing_1.inject([employee_service_1.EmployeeService, http_1.HttpClient], function (employeeService, httpClient) {
        var responseTemp = 1;
        var employeeModel = {
            empId: 1, empName: 'abc', empaddress: 'address', empEmailId: 'email'
        };
        spyOn(httpClient, 'post').and.returnValue(rxjs_1.of(responseTemp));
        employeeService.saveEmployee(employeeModel).subscribe(function (response) {
            expect(responseTemp).toEqual(response);
        });
    }));
    fit('Should return response from updateEmployee', testing_1.inject([employee_service_1.EmployeeService, http_1.HttpClient], function (employeeService, httpClient) {
        var responseTemp = 1;
        var employeeModel = {
            empId: 1, empName: 'abc', empaddress: 'address', empEmailId: 'email'
        };
        spyOn(httpClient, 'put').and.returnValue(rxjs_1.of(responseTemp));
        employeeService.updateEmployee(employeeModel).subscribe(function (response) {
            expect(responseTemp).toEqual(response);
        });
    }));
    fit('Should return response from deleteEmployee', testing_1.inject([employee_service_1.EmployeeService, http_1.HttpClient], function (employeeService, httpClient) {
        var responseTemp = 1;
        var id = 1;
        spyOn(httpClient, 'delete').and.returnValue(rxjs_1.of(responseTemp));
        employeeService.deleteEmployee(id).subscribe(function (response) {
            expect(responseTemp).toEqual(response);
        });
    }));
});
//# sourceMappingURL=employee.service.spec.js.map