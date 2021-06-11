import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../../service/user.service';

import { UserComponent } from './user.component';

fdescribe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [UserComponent],
      providers: [UserComponent,
        UserService,
        HttpClient
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call ngOnInIt', inject([UserComponent, UserService, HttpClient],
    (userComponent, userService, httpClient) => {

      spyOn(component, 'getUserList');

      component.ngOnInit();

      expect(component.getUserList).toHaveBeenCalled();
    }));


  fit('should call getUserList', inject([UserComponent, UserService, HttpClient],
    (userComponent, userService, httpClient) => {

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

      spyOn(userService, 'getUserList').and.returnValue(of(responseTemp));

      component.getUserList();

      expect(userService.getUserList).toHaveBeenCalled();
      expect(component.userList).toEqual(responseTemp);

  }));


});
