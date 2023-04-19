import { Module } from '@nestjs/common';
import { TatumController } from './tatum.controller';
import { TatumService } from './tatum.service';
import { AxiosService } from 'src/shared/utils/axios';
import { UtilModule } from 'src/shared/utils/util.module';

@Module({
    controllers: [TatumController],
    providers: [TatumService],
    imports: [UtilModule],
})
export class TatumModule {}
