import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Provider, User } from '../../shared/mongo/schema/user';
import { ErrorStrings } from '../../shared/utils/errors';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly errorStrings: ErrorStrings
    ) {}

    public async findUserByContext(userId?: string, email?: string, projection?: any) {
        if (!userId && !email) throw new HttpException(this.errorStrings.NO_EMAIL_AND_ID, HttpStatus.FORBIDDEN);
        if (userId && email)
            return await this.userModel.findOne({ _id: new Types.ObjectId(userId), email }, projection);
        if (userId) return await this.userModel.findOne({ _id: new Types.ObjectId(userId) }, projection);
        if (email) return await this.userModel.findOne({ email }, projection);
        else throw new HttpException(this.errorStrings.OPERATION_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public isProvider(type: string) {
        return [Provider.EMAIL, Provider.GOOGLE].includes(type as Provider);
    }

    public async registerUser(email: string, uid: string, provider: string, name: string) {
        const user = new this.userModel({ name, email, uid, provider, totalLikesCount: 0 });
        await user.save();
        return user.toObject();
    }
}
