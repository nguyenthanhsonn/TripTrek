import { IsNotEmpty, IsString } from "class-validator"
import { Match } from "src/utils/match.util"


export default class changePasswordDTO{
    @IsString()
    @IsNotEmpty({message: 'Old password is required'})
    oldPassword: string
    @IsString()
    @IsNotEmpty({message: 'New password is required'})
    newPassword: string
}