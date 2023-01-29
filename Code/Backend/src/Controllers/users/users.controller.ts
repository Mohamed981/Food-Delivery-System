import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  Login,
  Register,
  RestaurantDTO,
  Result,
  Token,
  UserDTO,
} from 'src/dtos';
import { RestaurantsService } from 'src/Services/restaurants/restaurants.service';
import { UsersService } from 'src/Services/users/users.service';
import { User } from 'src/typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private restaurantService: RestaurantsService,
  ) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post('signup')
  async register(@Body() userDTO: Register) {
    let result = new Result<Token>();
    let check: boolean = await this.userService.IsRegistered(userDTO.Email);
    if (check) result.Errors.push('This Email is registered');
    check = await this.restaurantService.IsRegistered(userDTO.RestaurantName);
    if (check) result.Errors.push('This Restaurant is registered');
    if (result.Errors.length !== 0) return result;
    let user: User = await this.userService.createUser(userDTO);
    if (userDTO.IsOwner) {
      let restaurantDTO: RestaurantDTO = {
        userId: user.id,
        RestaurantName: userDTO.RestaurantName,
        Category: userDTO.Category,
      };
      await this.restaurantService.createRestaurant(restaurantDTO);
    }
    const token = await this.userService.getTokens(
      user.id,
      user.IsOwner,
      user.Email,
    );
    result.results = token;
    return result;
  }

  @Post('signin')
  async login(@Body() login: Login) {
    let result = new Result<Token>();
    const user = await this.userService.loginUser(login);
    if(user === null){
      result.Errors.push("Wrong Email or Password");
      return result;
    }
      
    const token = await this.userService.getTokens(
      user.id,
      user.IsOwner,
      user.Email,
    );
    result.results = token;
    return result;
  }

  @Get(':id')
  GetUser(@Param('id', ParseIntPipe) id: number, @Body() userDTO: UserDTO) {
    return this.userService.findUser(id, userDTO);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDTO: UserDTO,
  ) {
    return this.userService.updateUser(id, userDTO);
  }

  @Delete(':id')
  DeleteUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id);
  }
}
