import User from "../model/User.ts";

interface HttpResponseWithToken {
    status: string;
    accessToken: string,
    user: User;
}

export default HttpResponseWithToken;

