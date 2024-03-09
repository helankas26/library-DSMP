import User from "../model/User.ts";

interface HttpResponseWithToken {
    status: string;
    token: string,
    user: User;
}

export default HttpResponseWithToken;

