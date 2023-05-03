import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export enum Provider {
    GOOGLE = 'GOOGLE',
    EMAIL = 'EMAIL',
}

@Schema()
export class User extends Document {
    name?: String;

    @Prop({ required: true })
    uid: String;

    @Prop({ required: true, unique: true })
    email?: String;

    @Prop({ required: false })
    profilePhotoURL?: String;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
    followers: User[];

    @Prop({ required: true })
    totalLikesCount: number;

    @Prop({ required: true, enum: Provider, type: String })
    provider: Provider;
}

export const UserSchema = SchemaFactory.createForClass(User);
