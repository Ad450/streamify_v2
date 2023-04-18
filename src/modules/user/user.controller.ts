import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { LoginDTO, RegisterUseDTO } from './user.dto';
import { ErrorStrings } from '../../shared/utils/errors';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    @Inject()
    errorsStrings: ErrorStrings;
    @Inject()
    userService: UserService;

    @Post()
    public async registerUser(@Body() registerUserDTO: RegisterUseDTO) {
        const { email, uid, provider, name } = registerUserDTO;
        if (!email || !uid || !provider || !name)
            throw new HttpException(this.errorsStrings.MISSING_PARAMS, HttpStatus.BAD_REQUEST);
        const user = await this.userService.findUserByContext(undefined, email);
        if (user) throw new HttpException(this.errorsStrings.USER_EXISTS, HttpStatus.NOT_ACCEPTABLE);
        if (!this.userService.isProvider(provider.toUpperCase()))
            throw new HttpException(this.errorsStrings.UNSUPPORTED_PROVIDER, HttpStatus.NOT_ACCEPTABLE);
        return await this.userService.registerUser(email, uid, provider, name);
    }

    @Post('login')
    public async login(@Body() loginDTO: LoginDTO) {
        const { uid, email } = loginDTO;
        if (!uid || !email) throw new HttpException(this.errorsStrings.MISSING_PARAMS, HttpStatus.BAD_REQUEST);
        const user = await this.userService.findUserByContext(undefined, email);
        if (!user) throw new HttpException(this.errorsStrings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        if (user.email !== email) throw new HttpException(this.errorsStrings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        return { success: true };
    }
}
