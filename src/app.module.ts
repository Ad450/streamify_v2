import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TatumModule } from './modules/tatum/tatum.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { DatabaseModule } from './shared/mongo/mongo';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [UserModule, TatumModule, UploadsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
