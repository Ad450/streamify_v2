import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import Web3 from 'web3';
import Tatum from '@tatumio/tatum';
import Moralis from 'moralis';
import BigNumber from 'bignumber.js';

@Injectable()
export class RewardsSevice {
    /// the method uses a ratio of 1000 likes to $4
    /// convert the resulting amount in dollars to ETH by first fetching
    /// the current price of ETH at the time of request
    public async calculateRewards(likesCountToWithdrawal: number) {
        let amountInDollarsToReward = (4 * likesCountToWithdrawal) / 1000;
        let priceOfETH = parseInt(await this.getCurrentPriceOfETHInUSD());
        let amountOfETHToReward = (1 * amountInDollarsToReward) / priceOfETH;
        return amountOfETHToReward;
    }

    public async getCurrentPriceOfETHInUSD() {
        const coingeckoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
        try {
            const instance: AxiosInstance = axios.create({
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                timeout: 50000,
            });
            const response = await instance.get(coingeckoURL);
            if (response) {
                return response.data['ethereum']['usd'];
            }
        } catch (error) {
            throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async sendEth(to: string, amount: number): Promise<string> {
        const web3 = new Web3(
            new Web3.providers.HttpProvider('https://eth-sepolia.g.alchemy.com/v2/keUvyHXy_kw6Q__qyw_zX9hxEM5Qs0au')
        );
        try {
            const amountInWei = BigNumber(amount * 10 ** 18)
                .toString()
                .split('.')[0];
            let privateKey;
            let senderAddress;
            /// private key and senderAddress are exposed for educational purpose since
            // everything will be run on ethereum-serpolia
            privateKey = '1cb0588b670b81fcdf80f3c14284925c0f449e7052c6ab25966a5f2eed47b29c';
            senderAddress = '0xe57A9202878B529E6D35602faB66a5a0B5143f38';
            const txObject = {
                from: senderAddress,
                to,
                value: amountInWei,
                gasPrice: web3.utils.toWei('20', 'gwei'),
                gasLimit: 21000,
                nonce: await web3.eth.getTransactionCount(senderAddress),
            };

            const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
            if (!signedTx.rawTransaction) {
                throw new HttpException('couldnot sign transaction', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            console.log(`Transaction hash: ${receipt.transactionHash}`);
            return receipt.transactionHash;
        } catch (error) {
            console.error(`Failed to send ETH: ${error}`);
            throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async sendEthWithMoralis(to: string, amount: string) {
        try {
        } catch (error) {}
    }
}
