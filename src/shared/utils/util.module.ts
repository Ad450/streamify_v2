import { Module } from '@nestjs/common';
import { ErrorStrings } from './errors';
import { AxiosService } from './axios';

@Module({
    providers: [ErrorStrings, AxiosService],
    exports: [ErrorStrings, AxiosService],
})
export class UtilModule {}
