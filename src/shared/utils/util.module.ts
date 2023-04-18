import { Module } from '@nestjs/common';
import { ErrorStrings } from './errors';

@Module({
    providers: [ErrorStrings],
    exports: [ErrorStrings],
})
export class UtilModule {}
