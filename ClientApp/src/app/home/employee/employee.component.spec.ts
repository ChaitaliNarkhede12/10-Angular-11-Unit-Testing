import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeService } from '../../service/employee.service';

import { EmployeeComponent } from './employee.component';

fdescribe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [EmployeeComponent],
      providers: [EmployeeComponent,
        EmployeeService,
        HttpClient
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call ngOnInIt', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      var responseTemp = [
        {
          "empId": 1,
          "empName": "Chaitali narkhede",
          "empEmailId": "chaitali.narkhede@gmail.com",
          "empaddress": "Pune"
        }
      ];

      spyOn(component, 'getEmployeeList').and.callThrough();
      spyOn(employeeService, 'getEmployeelist').and.returnValue(of(responseTemp));
      component.ngOnInit();
      expect(component.empList).toEqual(responseTemp);
    }));

  fit('should call getEmployeeList', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      var responseTemp = [
        {
          "empId": 1,
          "empName": "Chaitali narkhede",
          "empEmailId": "chaitali.narkhede@gmail.com",
          "empaddress": "Pune"
        }
      ];

      spyOn(employeeService, 'getEmployeelist').and.returnValue(of(responseTemp));
      component.getEmployeeList();
      expect(component.empList).toEqual(responseTemp);
      expect(component.empList.length).toBeGreaterThan(0);
    }));

  fit('should call createEmployee', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      component.createEmployee();
      expect(component.isCreateView).toEqual(true);
    }));

  fit('should call editData', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      var emp: EmployeeModel = {
        empId: 1,
        empName: 'test',
        empaddress: 'addr',
        empEmailId:'email'
      }
      component.editData(emp);
      expect(component.isCreateView).toEqual(true);
      expect(component.employee).toEqual(emp);
    }));

  fit('should call saveEmployee ', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      const flag = 1;
      var emp: EmployeeModel = {
        empId: 0,
        empName: 'test',
        empaddress: 'addr',
        empEmailId: 'email'
      }

      component.employee = emp;

      spyOn(component, 'addEmployee');
      spyOn(employeeService, 'saveEmployee').withArgs(emp).and.returnValue(of(flag));

      component.saveEmployee();

      expect(component.addEmployee).toHaveBeenCalled();
    }));

  fit('should call saveEmployee -> addEmployee', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      const flag = 1;
      var emp: EmployeeModel = {
        empId: 0,
        empName: 'test',
        empaddress: 'addr',
        empEmailId: 'email'
      }

      var responseEmployeeList = [
        {
          "empId": 1,
          "empName": "Chaitali narkhede",
          "empEmailId": "chaitali.narkhede@gmail.com",
          "empaddress": "Pune"
        }
      ];

      component.employee = emp;

      spyOn(component, 'addEmployee').withArgs(emp).and.callThrough();
      spyOn(employeeService, 'saveEmployee').withArgs(emp).and.returnValue(of(flag));

      spyOn(component, 'getEmployeeList').and.callThrough();
      spyOn(employeeService, 'getEmployeelist').and.returnValue(of(responseEmployeeList));

      component.saveEmployee();

      expect(employeeService.saveEmployee).toHaveBeenCalledWith(emp);
      expect(component.getEmployeeList).toHaveBeenCalled();
      expect(component.empList).toEqual(responseEmployeeList);
      expect(component.empList.length).toBeGreaterThan(0);
    }));

  fit('should call saveEmployee -> updateEmployee', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      const flag = 1;
      var emp: EmployeeModel = {
        empId: 1,
        empName: 'test',
        empaddress: 'addr',
        empEmailId: 'email'
      }

      var responseEmployeeList = [
        {
          "empId": 1,
          "empName": "Chaitali narkhede",
          "empEmailId": "chaitali.narkhede@gmail.com",
          "empaddress": "Pune"
        }
      ];

      component.employee = emp;

      spyOn(component, 'updateEmployee').withArgs(emp).and.callThrough();
      spyOn(employeeService, 'updateEmployee').withArgs(emp).and.returnValue(of(flag));

      spyOn(component, 'getEmployeeList').and.callThrough();
      spyOn(employeeService, 'getEmployeelist').and.returnValue(of(responseEmployeeList));

      component.saveEmployee();
      expect(employeeService.updateEmployee).toHaveBeenCalledWith(emp);
      expect(component.getEmployeeList).toHaveBeenCalled();
      expect(component.empList).toEqual(responseEmployeeList);
      expect(component.empList.length).toBeGreaterThan(0);
    }));

  fit('should call deleteEmployee', inject([EmployeeComponent, EmployeeService, HttpClient],
    (employeeComponent, employeeService, httpClient) => {
      const flag = 1;

      var emp: EmployeeModel = {
        empId: 1,
        empName: 'test',
        empaddress: 'addr',
        empEmailId: 'email'
      }

      var responseEmployeeList = [
        {
          "empId": 1,
          "empName": "Chaitali narkhede",
          "empEmailId": "chaitali.narkhede@gmail.com",
          "empaddress": "Pune"
        }
      ];

      spyOn(employeeService, 'deleteEmployee').withArgs(emp.empId).and.returnValue(of(flag));

      spyOn(component, 'getEmployeeList').and.callThrough();
      spyOn(employeeService, 'getEmployeelist').and.returnValue(of(responseEmployeeList));

      component.deleteEmployee(emp);

      expect(employeeService.deleteEmployee).toHaveBeenCalledWith(emp.empId);
      expect(component.getEmployeeList).toHaveBeenCalled();
      expect(component.empList).toEqual(responseEmployeeList);
      expect(component.empList.length).toBeGreaterThan(0);
    }));
});
