export interface Token {
    Status: boolean;
    Message: string;
    Session: {
        Token: string;
        LoggedIn: boolean;
        UserData: any;
    }
}