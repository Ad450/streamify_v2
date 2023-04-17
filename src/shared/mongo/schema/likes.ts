import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user';
import mongoose, { Date } from 'mongoose';
import { Video } from './video';

@Schema()
export class Likes {
    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
    likedBy: User;

    @Prop({ default: 1 })
    count: number;

    @Prop({ default: Date.now, type: Date })
    likedAt: Date;

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
    ownerOfVideo: User;

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' } })
    video: Video;
}

export const LikesSchema = SchemaFactory.createForClass(Likes);
