import { Controller, HttpCode, Put, UseGuards, Request, Body, Get, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import updateProfileDTO from '../auth/dto/updateProfile.dto';
import { UserService } from './user.service';
import ViewProfile from '../auth/interfaces/viewProfile.interface';
import ViewProfileDTO from './dto/viewProfile.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Put('profile-update')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    async updateProfile(@Request() req, @Body() dto: updateProfileDTO){
        const userId = req.user.id;
        return this.userService.updateProfile(userId, dto);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getProfile(@Request() req): Promise<ViewProfileDTO> {
        return this.userService.getProfile(req.user.id);
    }
}
