import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { ClientSession } from 'mongoose';

@Injectable()
export class MongoTransaction {
    public async runTransaction(callback: (session: ClientSession) => Promise<void>, session: ClientSession) {
        session.startTransaction();
        try {
            console.log('inside run transaction');
            await callback(session);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await session.abortTransaction();
        }
    }
}
