import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user';
import mongoose, { Date } from 'mongoose';

@Schema()
export class Video {
    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
    uploadedBy: User;

    @Prop({ required: true })
    url: string;

    @Prop({ default: Date.now, type: Date })
    uploadedAt: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    allUsersWhoLike: User[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
