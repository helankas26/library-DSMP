import User from "../model/User.tsx";

interface HttpResponseWithToken {
    status: string;
    token: string,
    user: User;
}

export default HttpResponseWithToken;

