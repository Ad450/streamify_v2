export class UploadVideoDTO {
    public readonly url: string;
    public readonly uploadedBy: string;
}
export class LikeVideDTO {
    public readonly likedBy: string;
    public readonly ownerOfVideo: string;
    public readonly videoId: string;
}

export class DislikeDTO {
    public readonly dislikedBy: string;
    public readonly ownerOfVideo: string;
    public readonly videoId: string;
}
