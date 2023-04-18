import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../shared/mongo/mongo';
import { UtilModule } from '../../shared/utils/util.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [DatabaseModule, UtilModule],
})
export class UserModule {}
