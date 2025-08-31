import { IsNotEmpty, IsString } from "class-validator"
import { Match } from "src/utils/match.util"


export default class changePasswordDTO{
    @IsString()
    @IsNotEmpty({message: 'Old password is required'})
    oldPassword: string
    @IsString()
    @IsNotEmpty({message: 'New password is required'})
    newPassword: string
    @IsString()
    @IsNotEmpty({message: 'Confirm password is required'})
    @Match('newPassword', {message: 'Confirm password does not match'})
    confirmPassword: string
}