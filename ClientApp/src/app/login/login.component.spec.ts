import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../service/authentication.service';
import { SessionStorageService } from '../service/session-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../app/service/user.service';
import { of } from 'rxjs';
import { LoginModel } from './models/login.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [LoginComponent,
        AuthenticationService,
        SessionStorageService,
        UserService,
        HttpClient
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return response from login', inject([LoginComponent, AuthenticationService, SessionStorageService, HttpClient, UserService],
    (loginComponent, authenticationService, sessionStorageService, httpClient, userService) => {

      const loginModelTemp: LoginModel = {
        userName: 'chaitali.narkhede1991@gmail.com',
        password: 'abc'
      }

      var responseTemp = {
        "accessToken": "access_token",
        "refreshToken": "refresh_token",
        "accessTokenExpiryTime": "expiry_time",
      };

      var responseUserTemp: any =
      {
        "userId": 1,
        "userName": "chaitali.narkhede@gmail.com",
        "firstName": "Chaitali",
        "lastName": "Narkhede"
      };

      spyOn(authenticationService, 'setUserName').and.callThrough();
      spyOn(authenticationService, 'loginUser').and.returnValue(of(responseTemp));
      spyOn(authenticationService, 'setTokenFromResponse').and.callThrough();

      spyOn(loginComponent, 'getUserDetails').withArgs(loginModelTemp.userName).and.callThrough();
      spyOn(userService, 'getUserDetails').and.returnValue(of(responseUserTemp));

      component.loginModel = loginModelTemp;

      component.login();
      expect(authenticationService.setUserName).toHaveBeenCalledWith(loginModelTemp.userName);
      expect(authenticationService.setTokenFromResponse).toHaveBeenCalledWith(responseTemp);
      expect(userService.getUserDetails).toHaveBeenCalledWith(loginModelTemp.userName);
    }));
  

  it('Should return response from getUserDetails', inject([LoginComponent, AuthenticationService, SessionStorageService, HttpClient, UserService],
    (loginComponent, authenticationService, sessionStorageService, httpClient, userService) => {
      var responseTemp: any =
      {
        "userId": 1,
        "userName": "chaitali.narkhede@gmail.com",
        "firstName": "Chaitali",
        "lastName": "Narkhede"
      };

      const emailId = 'chaitali.narkhede1991@gmail.com';
      spyOn(userService, 'getUserDetails').withArgs(emailId).and.returnValue(of(responseTemp));

      component.getUserDetails(emailId);
      expect(sessionStorage.getItem("currentUser").length).toBeGreaterThan(0);
      sessionStorage.clear();
    }));

  it('Should return exception from login', inject([LoginComponent, AuthenticationService, SessionStorageService, HttpClient],
    (loginComponent, authenticationService, sessionStorageService, httpClient) => {
      const loginModelTemp: LoginModel = {
        userName: 'chaitali.narkhede1991@gmail.com',
        password: 'abc'
      }

      var responseTemp = {
        "Message": "Server Error",
      };

      spyOn(authenticationService, 'setUserName');
      spyOn(authenticationService, 'loginUser').and.throwError("Error: Server Error");
      //expect(sessionStorage.length).toEqual(0);
    }));

  it('Should return exception from getUserDetails', inject([LoginComponent, AuthenticationService, SessionStorageService, HttpClient, UserService],
    (loginComponent, authenticationService, sessionStorageService, httpClient, userService) => {
      var responseTemp: any =
      {
        "userId": 1,
        "userName": "chaitali.narkhede@gmail.com",
        "firstName": "Chaitali",
        "lastName": "Narkhede"
      };

      spyOn(userService, 'getUserDetails').withArgs(responseTemp.userName).and.throwError("Error: Server Error");
      expect(sessionStorage.getItem("currentUser")).toEqual(null);
    }));
});
