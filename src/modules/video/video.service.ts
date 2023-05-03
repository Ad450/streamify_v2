import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Video } from '../../shared/mongo/schema/video';
import { UserService } from '../user/user.service';
import { Likes } from '../../shared/mongo/schema/likes';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private readonly videoModel: Model<Video>,
        @InjectModel(Likes.name) private readonly likeModel: Model<Likes>,
        private readonly userService: UserService
    ) {}

    public async findVideoByOwnerAndURL(owner: string, url: string) {
        if (!Types.ObjectId.isValid(owner)) throw new HttpException('invalid objectId', HttpStatus.NOT_ACCEPTABLE);
        const video = await this.videoModel.findOne({ uploadedBy: new Types.ObjectId(owner), url });
        return video;
    }

    public async uploadVideo(owner: string, url: string) {
        if (!Types.ObjectId.isValid(owner)) throw new HttpException('invalid objectId', HttpStatus.NOT_ACCEPTABLE);
        const uploadedBy = new Types.ObjectId(owner);
        const video = new this.videoModel({ uploadedBy, url });
        await video.save();
    }

    public async findVideoById(videoId: string) {
        return await this.videoModel.findOne({ _id: new Types.ObjectId(videoId) });
    }

    public async findAllVideos() {
        return await this.videoModel.find();
    }

    public async findVideosByUploadedBy(uploadedBy: string) {
        return await this.videoModel.find({ uploadedBy: new Types.ObjectId(uploadedBy) });
    }

    public async incrementLikeCountOfVideoOwner(owner: Types.ObjectId) {
        const user = await this.userService.findUserByContext(owner.toString());
        await user?.updateOne({ totalLikesCount: user.totalLikesCount + 1 });
        return;
    }

    public async addLikedByToVideoLikesArray(likedBy: Types.ObjectId, videoId: Types.ObjectId) {
        const video = await this.findVideoById(videoId.toString());
        await video?.updateOne({ allUsersWhoLike: [...video?.allUsersWhoLike, likedBy] });
        return;
    }

    public async decrementLikeCountOfVideoOwner(owner: Types.ObjectId) {
        const user = await this.userService.findUserByContext(owner.toString());
        await user?.updateOne({ totalLikesCount: user.totalLikesCount - 1 });
        return;
    }

    public async removeLikedByToVideoLikesArray(likedBy: Types.ObjectId, videoId: Types.ObjectId) {
        const video = await this.findVideoById(videoId.toString());
        if (!video) throw new HttpException('video not found', HttpStatus.NOT_FOUND);
        let newUsersWhoLike = video?.allUsersWhoLike.filter((user) => user._id !== likedBy);
        await video?.updateOne({ allUsersWhoLike: [...newUsersWhoLike] });
        return;
    }

    public async deleteLike(dislikedBy: Types.ObjectId, ownerOfVideo: Types.ObjectId, video: Types.ObjectId) {
        await this.likeModel.deleteOne({ likedBy: dislikedBy, ownerOfVideo, video });
        return;
    }

    public async createLike(likedBy: Types.ObjectId, ownerOfVideo: Types.ObjectId, video: Types.ObjectId) {
        const like = new this.likeModel({ likedBy, ownerOfVideo, video });
        await like.save();
        return;
    }

    public async findLikeByOwnerAndVideoIdAndLikedBy(
        videoId: Types.ObjectId,
        ownerOfVideo: Types.ObjectId,
        likedBy: Types.ObjectId
    ) {
        const video = await this.likeModel.findOne({ video: videoId, ownerOfVideo, likedBy });
        return video;
    }

    public async dislikeVideo(videoId: Types.ObjectId, ownerOfVideo: Types.ObjectId, dislikedBy: Types.ObjectId) {
        await this.likeModel.deleteOne({ video: videoId, ownerOfVideo, likedBy: dislikedBy });
        return;
    }
}
