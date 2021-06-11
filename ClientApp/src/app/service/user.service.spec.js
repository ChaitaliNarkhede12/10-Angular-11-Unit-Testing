"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var user_service_1 = require("./user.service");
fdescribe('UserService', function () {
    var userService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpClientModule],
            declarations: [],
            providers: [user_service_1.UserService, http_1.HttpClient]
        });
        userService = testing_1.TestBed.get(user_service_1.UserService);
    });
    fit('should be created', function () {
        expect(userService).toBeTruthy();
    });
    fit('Should return response from getUserDetails', testing_1.inject([user_service_1.UserService, http_1.HttpClient], function (userService, httpClient) {
        var responseTemp = {
            "userId": 1,
            "userName": "chaitali.narkhede@gmail.com",
            "firstName": "Chaitali",
            "lastName": "Narkhede"
        };
        spyOn(httpClient, 'get').and.returnValue(rxjs_1.of(responseTemp));
        userService.getUserDetails().subscribe(function (response) {
            expect(responseTemp.length).toEqual(response.length);
        });
    }));
    fit('Should return response from getUserList', testing_1.inject([user_service_1.UserService, http_1.HttpClient], function (userService, httpClient) {
        var responseTemp = [
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
        spyOn(httpClient, 'get').and.returnValue(rxjs_1.of(responseTemp));
        userService.getUserList().subscribe(function (response) {
            expect(responseTemp.length).toEqual(response.length);
        });
    }));
});
//# sourceMappingURL=user.service.spec.js.map