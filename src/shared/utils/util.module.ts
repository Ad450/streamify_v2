import { Module } from '@nestjs/common';
import { ErrorStrings } from './errors';
import { AxiosService } from './axios';
import { RewardsSevice } from './rewards';

@Module({
    providers: [ErrorStrings, AxiosService, RewardsSevice],
    exports: [ErrorStrings, AxiosService, RewardsSevice],
})
export class UtilModule {}
