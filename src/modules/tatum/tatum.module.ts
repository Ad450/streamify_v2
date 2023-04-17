import { Module } from '@nestjs/common';
import { TatumController } from './tatum.controller';
import { TatumService } from './tatum.service';

@Module({
    controllers: [TatumController],
    providers: [TatumService],
})
export class TatumModule {}
