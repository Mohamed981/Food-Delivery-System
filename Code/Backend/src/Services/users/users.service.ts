import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Login, Register, RestaurantDTO, Token, UserDTO, UserToken } from 'src/dtos';
import { Restaurant, User } from 'src/typeorm';
import { hashPassword, isPasswordCorrect } from 'src/utils/hashing';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}
  findUsers() {
    return this.userRepository.find();
  }
  async getTokens(
    userId: number,
    isOwner: boolean,
    email: string,
  ): Promise<Token> {
    const jwtPayload: UserToken = {
      sub: userId,
      isOwner: isOwner,
      email: email,
    };

    const at = await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('AT_SECRET'),
      expiresIn: '15m',
    });

    return { token: at };
  }

  async IsRegistered(Email:string){
    const user = await this.userRepository.findOne({
      where: { Email: Email },
    });
    if(user) return true;
    return false;
  }
  
  async findUser(id: number, userDTO: UserDTO) {
    const user = await this.userRepository.findOneBy({ id });
    const pass = await isPasswordCorrect(
      userDTO.Password,
      user.Password,
      user.Salt,
    );
    if (pass) return user;
    else return 'Password is incorrect';
  }

  async loginUser(login: Login) {
    const user = await this.userRepository.findOne({
      where: { Email: login.Email },
    });
    if (
      !user ||
      !(await isPasswordCorrect(login.Password, user.Password, user.Salt))
    )
      return null;
    return user;
  }
  async createUser(userDetails: Register) {
    const user = await this.userRepository.findOne({
      where: { Email: userDetails.Email },
    });
    if (user) return null;
    await hashPassword(userDetails.Password).then((e) => {
      userDetails.Password = e.hash;
      userDetails.Salt = e.salt;
    });
    const newUser = await this.userRepository.create({ ...userDetails });
    
    await this.userRepository.save(newUser);
    
    return newUser;

  }
  async updateUser(id: number, userDTO: UserDTO) {
    return this.userRepository.update({ id }, { ...userDTO });
  }
  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }
}
