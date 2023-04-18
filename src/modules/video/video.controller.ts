import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { DislikeDTO, LikeVideDTO, UploadVideoDTO } from './video.dto';
import { ErrorStrings } from '../../shared/utils/errors';
import { UserService } from '../user/user.service';
import { VideoService } from './video.service';

@Controller('video')
export class UploadsController {
    @Inject()
    errorsStrings: ErrorStrings;

    @Inject()
    userService: UserService;
    @Inject()
    videoService: VideoService;

    @Post('upload')
    public async upload(@Body() uploadVideoDTO: UploadVideoDTO) {
        const { url, uploadedBy } = uploadVideoDTO;
        console.log(uploadedBy);
        if (!url || !uploadedBy) throw new HttpException(this.errorsStrings.MISSING_PARAMS, HttpStatus.BAD_REQUEST);
        const uploadedByExists = await this.userService.findUserByContext(uploadedBy);
        if (!uploadedByExists) throw new HttpException(this.errorsStrings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        const video = await this.videoService.findVideoByOwnerAndURL(uploadedBy, url);
        if (video) throw new HttpException(this.errorsStrings.VIDEO_EXISTS, HttpStatus.NOT_ACCEPTABLE);
        await this.videoService.uploadVideo(uploadedBy, url);
        return { success: true };
    }

    @Post('like')
    public async likeVideo(@Body() likeVideoDTO: LikeVideDTO) {
        const { ownerOfVideo, likedBy, videoId } = likeVideoDTO;
        if (!ownerOfVideo || !likedBy || !videoId)
            throw new HttpException(this.errorsStrings.MISSING_PARAMS, HttpStatus.BAD_REQUEST);
        const ownerExists = await this.userService.findUserByContext(ownerOfVideo);
        const likedByExists = await this.userService.findUserByContext(likedBy);
        const videoExists = await this.videoService.findVideoById(videoId);
        if (!ownerExists || !likedByExists || !videoExists)
            throw new HttpException(this.errorsStrings.NOT_ALLOWED, HttpStatus.NOT_ACCEPTABLE);
        const video = await this.videoService.findLikeByOwnerAndVideoIdAndLikedBy(
            videoExists._id,
            ownerExists._id,
            likedByExists._id
        );
        if (video) return { success: true };
        await this.videoService.addLikedByToVideoLikesArray(likedByExists._id, videoExists._id);
        await this.videoService.incrementLikeCountOfVideoOwner(ownerExists._id);
        await this.videoService.createLike(likedByExists._id, ownerExists._id, videoExists._id);
        return { success: true };
    }

    @Post('dislike')
    public async dislikeVideo(@Body() dislikeDTO: DislikeDTO) {
        const { ownerOfVideo, dislikedBy, videoId } = dislikeDTO;
        if (!ownerOfVideo || !dislikedBy || !videoId)
            throw new HttpException(this.errorsStrings.MISSING_PARAMS, HttpStatus.BAD_REQUEST);
        const ownerExists = await this.userService.findUserByContext(ownerOfVideo);
        const dislikedByExists = await this.userService.findUserByContext(dislikedBy);
        const videoExists = await this.videoService.findVideoById(videoId);
        if (!ownerExists || !dislikedByExists || !videoExists)
            throw new HttpException(this.errorsStrings.NOT_ALLOWED, HttpStatus.NOT_ACCEPTABLE);
        const video = await this.videoService.findLikeByOwnerAndVideoIdAndLikedBy(
            videoExists._id,
            ownerExists._id,
            dislikedByExists._id
        );
        if (!video) return { success: true };
        await this.videoService.decrementLikeCountOfVideoOwner(ownerExists._id);
        await this.videoService.removeLikedByToVideoLikesArray(dislikedByExists._id, videoExists._id);
        await this.videoService.deleteLike(dislikedByExists._id, ownerExists._id, videoExists._id);
        return { success: true };
    }
}
