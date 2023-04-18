export class RegisterUseDTO {
    public readonly uid: string;
    public readonly provider: string;
    public readonly name: string;
    public readonly email: string;
}

export class LoginDTO {
    public readonly uid: string;
    public readonly email: string;
}
