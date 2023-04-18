import { Module } from '@nestjs/common';
import { UploadsController } from './video.controller';
import { UtilModule } from 'src/shared/utils/util.module';
import { DatabaseModule } from 'src/shared/mongo/mongo';
import { UserModule } from '../user/user.module';
import { VideoService } from './video.service';

@Module({
    controllers: [UploadsController],
    providers: [VideoService],
    imports: [UtilModule, DatabaseModule, UserModule],
})
export class VideoModule {}
