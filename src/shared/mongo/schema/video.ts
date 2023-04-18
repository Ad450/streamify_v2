import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user';
import mongoose, { Date, Document } from 'mongoose';

@Schema()
export class Video extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    uploadedBy: User;

    @Prop({ required: true })
    url: string;

    @Prop({ default: Date.now, type: Date })
    uploadedAt: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    allUsersWhoLike: User[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
