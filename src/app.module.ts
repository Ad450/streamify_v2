import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TatumModule } from './modules/tatum/tatum.module';
import { VideoModule } from './modules/video/video.module';

@Module({
    imports: [UserModule, TatumModule, VideoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
