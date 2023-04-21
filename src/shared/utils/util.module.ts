import { Module } from '@nestjs/common';
import { ErrorStrings } from './errors';
import { AxiosService } from './axios';
import { RewardsSevice } from './rewards';
import { MongoTransaction } from './mongo.transaction';

@Module({
    providers: [ErrorStrings, AxiosService, RewardsSevice, MongoTransaction],
    exports: [ErrorStrings, AxiosService, RewardsSevice, MongoTransaction],
})
export class UtilModule {}
