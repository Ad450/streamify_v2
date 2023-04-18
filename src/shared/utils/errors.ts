import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorStrings {
    MISSING_PARAMS: string = 'MISSING PARAMS';
    USER_EXISTS: string = 'USER EXISTS';
    SERVER_BOOTSTRAP_ERROR: string = 'SERVER_BOOTSTRAP_ERROR';
    NOT_ALLOWED: string = 'OPERATION_NOT_ALLOWED';
    UNACCEPTED_USER_TYPE: string = 'UNACCEPTED_USER_TYPE';
    UNSUPPORTED_PROVIDER: string = 'UNSUPPORTED_PROVIDER';
    USER_NOT_FOUND: string = 'USER_NOT_FOUND';
    EMAIL_NOT_EXISTS: string = 'EMAIL_NOT_EXISTS';
    AUTH_NOT_FOUND: string = 'AUTH_NOT_FOUND';
    JWT_DECODE_ERROR: string = 'JWT_DECODE_ERROR';
    KID_NOT_FOUND: string = 'KID_NOT_FOUND';
    TOKEN_DECODE_ERROR: string = 'TOKEN_DECODE_ERROR';
    INVALID_ID_TOKEN: string = 'INVALID_ID_TOKEN';
    NO_PAYLOAD: string = 'NO_PAYLOAD';
    NO_EMAIL_AND_ID: string = 'userId or email must be provided';
    CATEGORY_NOT_FOUND: string = 'CATEGORY_NOT_FOUND';
    SOMETHING_BAD_HAPPENED: string = 'SOMETHING_BAD_HAPPENED';
    ERROR_FETCHING_CATEGORIES: string = 'ERROR_FETCHING_CATEGORIES';
    LOCATION_NOT_FOUND: string = 'LOCATION_NOT_FOUND';
    AGGREGATED_RATING_NOT_FOUND: string = 'AGGREGATED_RATING_NOT_FOUND';
    PORTFOLIO_NOT_FOUND: string = 'PORTFOLIO_NOT_FOUND';
    OPERATION_FAILED: string = 'OPERATION_FAILED';
    ACCESS_TOKEN_NOT_FOUND: string = 'ACCESS_TOKEN_NOT_FOUND';
    AUTHORIZATION_REQUIRED: string = 'AUTHORIZATION_REQUIRED';
}