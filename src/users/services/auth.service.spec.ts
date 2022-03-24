import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: any;

  beforeEach(async () => {
    // Create a fake copy of the users service (on which the auth service relies on)
    fakeUsersService = {
      findByEmail: () => Promise.resolve([]),
      create: (email: string, password: string, username: string) =>
        Promise.resolve({ id: 1, email, password, username }),
    };
    // Overiding the dependency injection with a fake service
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  //   it('Can create a new user with hash & salted password', async () => {
  //     let createUserDto = {
  //       email: 'fake@gmail.com',
  //       password: 'password1234',
  //       username: 'testUser',
  //     };
  //     const user = await service.signup(createUserDto);

  //     expect(user.password).not.toEqual('password1234');
  //     const [salt, hash] = user.password.split('.');
  //     expect(salt).toBeDefined();
  //     expect(hash).toBeDefined();
  //   });

  //   it('It throws an error if user signs up with email already in use ', async (done) => {
  //     let createUserDto = {
  //       email: 'test@gmail.com',
  //       password: 'password1234',
  //       username: 'testUser',
  //     };

  //     fakeUsersService.findByEmail = () =>
  //       Promise.resolve([{ id: 1, email: 'a', password: '1' }]);
  //     try {
  //       const user = await service.signup(createUserDto);
  //     } catch (err) {
  //       done();
  //     }
  //   });

  //   it('Throws if signin is called with an unused email', async (done) => {
  //     try {
  //       await service.signin('a@a.com', 'asdf');
  //     } catch (err) {
  //       done();
  //     }
  //   });
});
