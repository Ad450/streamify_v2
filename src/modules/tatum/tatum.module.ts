import { Module } from '@nestjs/common';
import { TatumController } from './tatum.controller';
import { TatumService } from './tatum.service';
import { UtilModule } from 'src/shared/utils/util.module';
import { UserModule } from '../user/user.module';

@Module({
    controllers: [TatumController],
    providers: [TatumService],
    imports: [UtilModule, UserModule],
})
export class TatumModule {}
