"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/common/http");
var session_storage_service_1 = require("../../app/service/session-storage.service");
describe('SessionStorageService', function () {
    var sessionStorageService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule],
            declarations: [],
            providers: [session_storage_service_1.SessionStorageService]
        });
        sessionStorageService = testing_1.TestBed.get(session_storage_service_1.SessionStorageService);
    });
    it('should be created', function () {
        expect(sessionStorageService).toBeTruthy();
    });
    it('should setServiceToken to session storage', function () {
        var token = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };
        sessionStorageService.setServiceToken(token);
        expect(sessionStorage.getItem("accessToken")).toEqual(token.accessToken);
        expect(sessionStorage.getItem("refreshToken")).toEqual(token.refreshToken);
        expect(sessionStorage.getItem("accessTokenExpiryTime")).toEqual(token.accessTokenExpiryTime.toString());
    });
    it('should getAccessToken from session storage', function () {
        var token = { accessToken: "accessToken", accessTokenExpiryTime: 12, refreshToken: "refreshToken" };
        sessionStorageService.setServiceToken(token);
        var result = sessionStorageService.getAccessToken();
        expect(result).toEqual(token.accessToken);
    });
    it('should getUser from session storage', function () {
        var userInfo = { userId: 1, userName: 'chaitali', firstName: 'test', lastName: 'lastName' };
        sessionStorage.setItem("currentUser", JSON.stringify(userInfo));
        var result = sessionStorageService.getUserFromSession();
        var sessionUser = JSON.parse(result);
        expect(sessionUser.userName).toEqual(userInfo.userName);
        expect(sessionUser.userId).toEqual(userInfo.userId);
        expect(sessionUser.firstName).toEqual(userInfo.firstName);
        expect(sessionUser.lastName).toEqual(userInfo.lastName);
    });
    it('should getServiceTokenModel from session storage', function () {
        var token = { accessToken: "accessToken", accessTokenExpiryTime: 1200, refreshToken: "refreshToken" };
        sessionStorageService.setServiceToken(token);
        var result = sessionStorageService.getServiceTokenModel();
        expect(result.accessToken).toEqual(token.accessToken);
        expect(result.accessTokenExpiryTime).toEqual(token.accessTokenExpiryTime);
        expect(result.refreshToken).toEqual(token.refreshToken);
    });
});
//# sourceMappingURL=session-storage.service.spec.js.map