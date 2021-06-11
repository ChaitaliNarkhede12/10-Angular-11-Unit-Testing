import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { SessionStorageService } from '../../app/service/session-storage.service';
import { TokenModel } from '../models/token.model';
import { UserInfo } from '../../app/models/user.model';

describe('SessionStorageService', () => {
  let sessionStorageService: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [SessionStorageService]
    });
    sessionStorageService = TestBed.get(SessionStorageService);
  });

  it('should be created', () => {
    expect(sessionStorageService).toBeTruthy();
  });

  it('should setServiceToken to session storage', () => {
    var token: TokenModel = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };

    sessionStorageService.setServiceToken(token);

    expect(sessionStorage.getItem("accessToken")).toEqual(token.accessToken);
    expect(sessionStorage.getItem("refreshToken")).toEqual(token.refreshToken);
    expect(sessionStorage.getItem("accessTokenExpiryTime")).toEqual(token.accessTokenExpiryTime.toString());
  });

  it('should getAccessToken from session storage', () => {
    var token: TokenModel = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };

    sessionStorageService.setServiceToken(token);
    var result = sessionStorageService.getAccessToken();
    expect(result).toEqual(token.accessToken);
  });

  it('should getUser from session storage', () => {
    var userInfo: UserInfo = { userId: 1, userName: 'chaitali', firstName: 'test', lastName: 'lastName' };
    sessionStorage.setItem("currentUser", JSON.stringify(userInfo));
    var result = sessionStorageService.getUserFromSession();
    const sessionUser = JSON.parse(result);
    expect(sessionUser.userName).toEqual(userInfo.userName);
    expect(sessionUser.userId).toEqual(userInfo.userId);
    expect(sessionUser.firstName).toEqual(userInfo.firstName);
    expect(sessionUser.lastName).toEqual(userInfo.lastName);
  });

  it('should getServiceTokenModel from session storage', () => {
    var token: TokenModel = { accessToken: "accessToken", accessTokenExpiryTime: 1200, refreshToken: "refreshToken" };

    sessionStorageService.setServiceToken(token);

    var result = sessionStorageService.getServiceTokenModel();
    expect(result.accessToken).toEqual(token.accessToken);
    expect(result.accessTokenExpiryTime).toEqual(token.accessTokenExpiryTime);
    expect(result.refreshToken).toEqual(token.refreshToken);

  });

});
