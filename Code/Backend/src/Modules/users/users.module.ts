import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/Controllers/users/users.controller';
import { UsersService } from 'src/Services/users/users.service';
import { User } from 'src/typeorm/entities/User';

@Module({
    imports:[JwtModule.register({}),TypeOrmModule.forFeature([User])],
    controllers:[UsersController],
    providers:[UsersService,JwtService]
})
export class UsersModule {}
