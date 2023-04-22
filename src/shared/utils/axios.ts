import { HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

interface MethodParam {
    method: string;
    url: string;
    data?: Record<string, any>;
}
type AxiosOperationParam = MethodParam & Record<string, any>;

export class AxiosService {
    instance: AxiosInstance = axios.create({
        baseURL: 'https://api.tatum.io',
        headers: {
            //TODO: replace with mainnet api key
            'x-api-key': process.env.TATUMCLIENT_TEST_NET_API_KEY || '1f192559-65e0-4f0b-9e40-9515ce341b9f',
            'x-testnet-type': 'ethereum-sepolia',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 50000,
    });

    public async axiosGet(url: string) {
        try {
            const res = await this.instance.get(url);
            return this._handleResponse(res);
        } catch (err) {
            return this._handleError(err);
        }
    }

    public async axiosPost<T extends Record<string, any>>(url: string, data: T) {
        try {
            const res = await this.instance.post(url, { ...data });
            return this._handleResponse(res);
        } catch (err) {
            return this._handleError(err);
        }
    }

    public async performAxiosOperation<T extends AxiosOperationParam>(config: T) {
        try {
            const res = await this.instance({ ...config });
            return this._handleResponse(res);
        } catch (error) {
            return this._handleError(error);
        }
    }

    private async _handleError(err?: AxiosError) {
        if (!err) {
            throw new HttpException('axios operation failed', HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            throw new HttpException(
                err.message,
                (err?.code && parseInt(err?.code)) || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private async _handleResponse(res?: AxiosResponse) {
        if (!res || !res?.data) throw new AxiosError();
        if (!String(res.status).startsWith('2')) throw new HttpException('forbidden', HttpStatus.FORBIDDEN);
        const data = res.data;
        return { ...data };
    }
}
