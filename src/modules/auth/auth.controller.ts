import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDTO from './dto/register.dto';
import loginDTO from './dto/login.dto';
import User from 'src/entities/user.entity';
import changePasswordDTO from './dto/changePassword.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import resetPasswordDTO from './dto/resetPassword.dto';
import updateProfileDTO from './dto/updateProfile.dto';

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('register')
    @HttpCode(201)
    async register(@Body() user: RegisterDTO){
        // console.log(user);
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() user: loginDTO){
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('change-password')
    @HttpCode(200)
    async changePassword(@Request() req, @Body() dto: changePasswordDTO){
        return this.authService.changePassword(req.user.id, dto);
    }

    @Post('forgot-password')
    @HttpCode(200)
    async forgotPassword(@Body() dto: {email: string}){
        return this.authService.forgotPassword(dto);
    }

    @Post('reset-password')
    @HttpCode(200)
    async resetPassword(@Body() dto: resetPasswordDTO){
        return this.authService.resetPassword(dto);
    }

    
}