import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { RewardUserDTO } from './tatum.dto';
import { ErrorStrings } from '../../shared/utils/errors';
import { UserService } from '../user/user.service';
import { RewardsSevice } from '../../shared/utils/rewards';
import { TatumService } from './tatum.service';

@Controller('reward')
export class TatumController {
    @Inject()
    errorsStrings: ErrorStrings;
    @Inject()
    userService: UserService;
    @Inject()
    rewardsService: RewardsSevice;

    @Post()
    public async rewardUsers(@Body() rewardUserDTO: RewardUserDTO) {
        const { userId, amount, address } = rewardUserDTO;
        if (!userId || !amount || !address)
            throw new HttpException(this.errorsStrings.MISSING_PARAMS, HttpStatus.BAD_REQUEST);
        const user = await this.userService.findUserByContext(userId);
        if (!user) throw new HttpException(this.errorsStrings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        const isLikesEnough = user.totalLikesCount > parseInt(amount);
        if (!isLikesEnough)
            throw new HttpException(this.errorsStrings.NOT_ENOUGH_LIKES_FOR_TRANSACTION, HttpStatus.FORBIDDEN);
        try {
            let newTotalLikesCount = user.totalLikesCount - parseInt(amount);
            await user.updateOne({ totalLikesCount: newTotalLikesCount });
            const amountToReward = await this.rewardsService.calculateRewards(parseInt(amount));
            await this.rewardsService.sendEth(address, amountToReward);
        } catch (error) {
            throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
