import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../app/service/authentication.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { SessionStorageService } from '../../app/service/session-storage.service';
import { BehaviorSubject, of } from 'rxjs';
import { LoginModel } from '../login/models/login.model';
import { TokenModel } from '../models/token.model';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [AuthenticationService, SessionStorageService, HttpClient]
    });
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should setUserName', () => {
    const userName: BehaviorSubject<string> = new BehaviorSubject<string>("abc");
    authenticationService.setUserName("abc");
    expect(authenticationService.userName).toEqual(userName);
  });

  it('should getUserName', () => {
    const userName: BehaviorSubject<string> = new BehaviorSubject<string>("abc");
    authenticationService.setUserName("abc");
    var result = authenticationService.getUserName();
    expect(result).toEqual(userName);
  });

  it('Should return response from loginUser', inject([AuthenticationService, SessionStorageService, HttpClient],
    (authenticationService, sessionStorage, httpClient) => {
      var loginModel: LoginModel = {
      userName: 'userName',
      password: 'password'
    };

    var response = {
      "status": {
        "message": "",
        "code": "200"
      },
      "data": {
        "accessToken": "access_token",
        "refreshToken": "refresh_token",
        "accessTokenExpiryTime": "expiry_time",
      }
    };

      spyOn(httpClient, 'post').and.returnValue(of(response));
      authenticationService.loginUser(loginModel).subscribe((response) => {
      expect(response.data.accessToken).toEqual('access_token');
      expect(response.data.refreshToken).toEqual('refresh_token');
      expect(response.data.accessTokenExpiryTime).toEqual('expiry_time');
      expect(response.status.code).toEqual("200");
    });
    }));

  it('Should return response from refreshToken', inject([AuthenticationService, SessionStorageService, HttpClient],
    (authenticationService, sessionStorageService, httpClient) => {
      var response = {
        "status": {
          "message": "",
          "code": "200"
        },
        "data": {
          "accessToken": "access_token",
          "refreshToken": "refresh_token",
          "accessTokenExpiryTime": "expiry_time",
        }
      };

      spyOn(httpClient, 'post').and.returnValue(of(response));
      authenticationService.refreshToken(response.data.refreshToken).subscribe((response) => {
        expect(response.data.accessToken).toEqual('access_token');
        expect(response.data.refreshToken).toEqual('refresh_token');
        expect(response.data.accessTokenExpiryTime).toEqual('expiry_time');
        expect(response.status.code).toEqual("200");
      });
    }));

  it('Should validate authentication token', inject([AuthenticationService, SessionStorageService], (authenticationService, sessionStorageService) => {
    var token: TokenModel = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };
    spyOn(sessionStorageService, 'getServiceTokenModel').and.returnValue(token);
    var result = authenticationService.validateUserAuthentication();
    expect(result).toEqual(true);
  }));

  it('Should setToken from response', inject([AuthenticationService, SessionStorageService], (authenticationService, sessionStorageService) => {
    var token: TokenModel = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };
    authenticationService.setTokenFromResponse(token);
    expect(sessionStorage.getItem("accessToken")).toEqual(token.accessToken);
    expect(sessionStorage.getItem("refreshToken")).toEqual(token.refreshToken);
    expect(sessionStorage.length).toEqual(3);
  }));

});
