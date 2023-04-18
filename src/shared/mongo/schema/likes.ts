import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user';
import mongoose, { Date, Document } from 'mongoose';
import { Video } from './video';

@Schema()
export class Likes extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    likedBy: User;

    @Prop({ default: 1 })
    count: number;

    @Prop({ default: Date.now, type: Date })
    likedAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    ownerOfVideo: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true })
    video: Video;
}

export const LikesSchema = SchemaFactory.createForClass(Likes);
