import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

// load env variables
config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // await Moralis.start({
    //     apiKey: process.env.MORALIS_API_KEY || 'pRhvSoyh8MxnPpjmLrWPwxXWxR4OKSnTYNuNtndJGFYp5eDiuCYbzhTTWEgoMkQi',
    // });
    await app.listen(3000);
}
bootstrap();
