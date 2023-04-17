import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    uid: String;

    @Prop({ required: false })
    email?: String;

    @Prop({ required: false })
    profilePhotoURL?: String;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    followers: User[];

    @Prop({ required: true })
    totalLikesCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
