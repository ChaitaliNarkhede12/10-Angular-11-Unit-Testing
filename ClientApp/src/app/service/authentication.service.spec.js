"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var authentication_service_1 = require("../../app/service/authentication.service");
var http_1 = require("@angular/common/http");
var session_storage_service_1 = require("../../app/service/session-storage.service");
var rxjs_1 = require("rxjs");
describe('AuthenticationService', function () {
    var authenticationService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule],
            declarations: [],
            providers: [authentication_service_1.AuthenticationService, session_storage_service_1.SessionStorageService, http_1.HttpClient]
        });
        authenticationService = testing_1.TestBed.get(authentication_service_1.AuthenticationService);
    });
    it('should be created', function () {
        expect(authenticationService).toBeTruthy();
    });
    it('should setUserName', function () {
        var userName = new rxjs_1.BehaviorSubject("abc");
        authenticationService.setUserName("abc");
        expect(authenticationService.userName).toEqual(userName);
    });
    it('should getUserName', function () {
        var userName = new rxjs_1.BehaviorSubject("abc");
        authenticationService.setUserName("abc");
        var result = authenticationService.getUserName();
        expect(result).toEqual(userName);
    });
    it('Should return response from loginUser', testing_1.inject([authentication_service_1.AuthenticationService, session_storage_service_1.SessionStorageService, http_1.HttpClient], function (authenticationService, sessionStorage, httpClient) {
        var loginModel = {
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
        spyOn(httpClient, 'post').and.returnValue(rxjs_1.of(response));
        authenticationService.loginUser(loginModel).subscribe(function (response) {
            expect(response.data.accessToken).toEqual('access_token');
            expect(response.data.refreshToken).toEqual('refresh_token');
            expect(response.data.accessTokenExpiryTime).toEqual('expiry_time');
            expect(response.status.code).toEqual("200");
        });
    }));
    it('Should return response from refreshToken', testing_1.inject([authentication_service_1.AuthenticationService, session_storage_service_1.SessionStorageService, http_1.HttpClient], function (authenticationService, sessionStorageService, httpClient) {
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
        spyOn(httpClient, 'post').and.returnValue(rxjs_1.of(response));
        authenticationService.refreshToken(response.data.refreshToken).subscribe(function (response) {
            expect(response.data.accessToken).toEqual('access_token');
            expect(response.data.refreshToken).toEqual('refresh_token');
            expect(response.data.accessTokenExpiryTime).toEqual('expiry_time');
            expect(response.status.code).toEqual("200");
        });
    }));
    it('Should validate authentication token', testing_1.inject([authentication_service_1.AuthenticationService, session_storage_service_1.SessionStorageService], function (authenticationService, sessionStorageService) {
        var token = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };
        spyOn(sessionStorageService, 'getServiceTokenModel').and.returnValue(token);
        var result = authenticationService.validateUserAuthentication();
        expect(result).toEqual(true);
    }));
    it('Should setToken from response', testing_1.inject([authentication_service_1.AuthenticationService, session_storage_service_1.SessionStorageService], function (authenticationService, sessionStorageService) {
        var token = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };
        authenticationService.setTokenFromResponse(token);
        expect(sessionStorage.getItem("accessToken")).toEqual(token.accessToken);
        expect(sessionStorage.getItem("refreshToken")).toEqual(token.refreshToken);
        expect(sessionStorage.length).toEqual(3);
    }));
});
//# sourceMappingURL=authentication.service.spec.js.map