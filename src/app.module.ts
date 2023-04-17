import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TatumModule } from './modules/tatum/tatum.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { DatabaseModule } from './shared/mongo/mongo';

@Module({
    imports: [UserModule, TatumModule, UploadsModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
