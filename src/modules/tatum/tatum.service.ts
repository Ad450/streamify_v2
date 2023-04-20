import { Inject, Injectable } from '@nestjs/common';
import { AxiosService } from '../../shared/utils/axios';
interface TransferRewardsParam {
    to: string;
    currency?: string;
    amount: bigint;
}

@Injectable()
export class TatumService {
    @Inject()
    axios: AxiosService;

    private async _generateCustodialWallet() {
        const data = {
            method: 'get',
            url: `/v3/ethereum/wallet?${process.env.MNEMONIC}`,
        };
        return await this.axios.performAxiosOperation({ ...data });
    }

    private async _generateAccount() {
        const { xpub } = await this._generateCustodialWallet();
        const url = `/v3/ethereum/address/${xpub}/1`;
        const { address } = await this.axios.axiosGet(url);
        return { address, xpub };
    }

    private async _getAccountPrivateKey() {
        const url = '/v3/ethereum/wallet/priv';
        const data = { index: 0, mnemonic: process.env.MNEMONIC };
        const { key } = await this.axios.axiosPost(url, data);
        return key;
    }

    public async transferRewards({ to, amount }: TransferRewardsParam): Promise<boolean> {
        const { ORG_PRIVATE_KEY } = process.env;
        const url = '/v3/ethereum/transaction';
        const data = {
            to,
            currency: 'ETH',
            amount,
            // testnet private key
            fromPrivateKey: ORG_PRIVATE_KEY || '1cb0588b670b81fcdf80f3c14284925c0f449e7052c6ab25966a5f2eed47b29c',
        };
        try {
            await this.axios.axiosPost(url, data);
            return true;
        } catch (error) {
            throw error;
        }
    }
}
