import { Module } from '@nestjs/common';
import { DatabaseModule } from './mongo/mongo';
import { UtilModule } from './utils/util.module';

@Module({
    imports: [DatabaseModule, UtilModule],
})
export class SharedModule {}
