import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import Web3 from 'web3';

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
        const web3 = new Web3('http://localhost:8545');
        try {
            const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
            let privateKey;
            let senderAddress;
            const { NODE_ENV } = process.env;
            if (NODE_ENV === 'DEVELOPMENT') {
                // replace with ganache or testnet
                privateKey = 'ed600878aee5a18702a4115344cb514a8170a771ccac0045303a56ff39db1bb0';
                senderAddress = '0xC74D732eF846aB0AEF32Bee26E1F911aC1f45949';
            } else {
                privateKey = '';
                senderAddress = '';
            }
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
}
