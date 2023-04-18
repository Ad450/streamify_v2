import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user';
import { Likes, LikesSchema } from './schema/likes';
import { Video, VideoSchema } from './schema/video';

const MONGO_URL = process.env.MONGO_URL;

@Module({
    imports: [
        MongooseModule.forRoot(
            MONGO_URL || 'mongodb+srv://Emmanuel1999:Manu450666@cluster0.ynk8r7l.mongodb.net/streamifyV2'
        ),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Likes.name, schema: LikesSchema },
            { name: Video.name, schema: VideoSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
