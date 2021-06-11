import { inject, TestBed } from '@angular/core/testing';
import { EmployeeService } from '../../app/service/employee.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';

fdescribe('AuthenticationService', () => {
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [EmployeeService, HttpClient]
    });
    employeeService = TestBed.get(EmployeeService);
  });

  fit('should be created', () => {
    expect(employeeService).toBeTruthy();
  });

  fit('Should return response from getEmployeelist', inject([EmployeeService, HttpClient],
    (employeeService, httpClient) => {
      var responseTemp = [
          {
            "empId": 1,
            "empName": "Chaitali narkhede",
            "empEmailId": "chaitali.narkhede@gmail.com",
            "empaddress": "Pune"
          }
        ]
      ;

      spyOn(httpClient, 'get').and.returnValue(of(responseTemp));
      employeeService.getEmployeelist().subscribe((response) => {
        expect(responseTemp.length).toEqual(response.length);
      });
    }));

  fit('Should return response from getEmployeeById', inject([EmployeeService, HttpClient],
    (employeeService, httpClient) => {
      var responseTemp = [
        {
          "empId": 1,
          "empName": "Chaitali narkhede",
          "empEmailId": "chaitali.narkhede@gmail.com",
          "empaddress": "Pune"
        }
      ]
        ;

      spyOn(httpClient, 'get').and.returnValue(of(responseTemp));
      employeeService.getEmployeeById(1).subscribe((response) => {
        expect(responseTemp.length).toEqual(response.length);
      });
    }));

  fit('Should return response from saveEmployee', inject([EmployeeService, HttpClient],
    (employeeService, httpClient) => {
      var responseTemp = 1;
      var employeeModel: EmployeeModel = {
        empId: 1, empName: 'abc', empaddress:'address',empEmailId:'email'
      }

      spyOn(httpClient, 'post').and.returnValue(of(responseTemp));
      employeeService.saveEmployee(employeeModel).subscribe((response) => {
        expect(responseTemp).toEqual(response);
      });
    }));

  fit('Should return response from updateEmployee', inject([EmployeeService, HttpClient],
    (employeeService, httpClient) => {
      var responseTemp = 1;
      var employeeModel: EmployeeModel = {
        empId: 1, empName: 'abc', empaddress: 'address', empEmailId: 'email'
      }

      spyOn(httpClient, 'put').and.returnValue(of(responseTemp));
      employeeService.updateEmployee(employeeModel).subscribe((response) => {
        expect(responseTemp).toEqual(response);
      });
    }));

  fit('Should return response from deleteEmployee', inject([EmployeeService, HttpClient],
    (employeeService, httpClient) => {
      var responseTemp = 1;
      var id = 1;

      spyOn(httpClient, 'delete').and.returnValue(of(responseTemp));
      employeeService.deleteEmployee(id).subscribe((response) => {
        expect(responseTemp).toEqual(response);
      });
    }));
});
