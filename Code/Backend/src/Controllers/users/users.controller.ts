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
import { UserDTO } from 'src/dtos';
import { UsersService } from 'src/Services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }

  @Get(':id')
  GetUser(
    @Param('id', ParseIntPipe) id: number, 
    @Body() userDTO: UserDTO
  ) 
    {
    return this.userService.findUser(id, userDTO);
  }

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number, 
    @Body() userDTO: UserDTO
  ) {
    return this.userService.updateUser(id, userDTO);
  }

  @Delete(':id')
  DeleteUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteUser(id);
  }
}
