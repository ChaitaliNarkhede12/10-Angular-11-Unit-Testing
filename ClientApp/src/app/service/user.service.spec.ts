import { inject, TestBed } from '@angular/core/testing';
import { EmployeeService } from '../../app/service/employee.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { UserService } from './user.service';
import { UserInfo } from '../models/user.model';

fdescribe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [UserService, HttpClient]
    });
    userService = TestBed.get(UserService);
  });

  fit('should be created', () => {
    expect(userService).toBeTruthy();
  });

  fit('Should return response from getUserDetails', inject([UserService, HttpClient],
    (userService, httpClient) => {
      var responseTemp: any =
      {
        "userId": 1,
        "userName": "chaitali.narkhede@gmail.com",
        "firstName": "Chaitali",
        "lastName": "Narkhede"
      };

      spyOn(httpClient, 'get').and.returnValue(of(responseTemp));
      userService.getUserDetails(responseTemp.userName).subscribe((response) => {
        expect(responseTemp.length).toEqual(response.length);
      });
    }));

  fit('Should return response from getUserList', inject([UserService, HttpClient],
    (userService, httpClient) => {
      var responseTemp: any[] = [
        {
          "userId": 1,
          "userName": "chaitali.narkhede@gmail.com",
          "firstName": "Chaitali",
          "lastName": "Narkhede"
        },
        {
          "userId": 2,
          "userName": "abc@gmail.com",
          "firstName": "abc",
          "lastName": "mno"
        }
      ];

      spyOn(httpClient, 'get').and.returnValue(of(responseTemp));
      userService.getUserList().subscribe((response) => {
        expect(responseTemp.length).toEqual(response.length);
      });
    }));

});
