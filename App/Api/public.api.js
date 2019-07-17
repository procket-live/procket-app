import { Post } from "../Utils/http.utils";
import { REGISTER, LOGIN } from "../Constants/api.constants";

class PublicApi {
    static register(body) {
        return Post({ url: REGISTER, body });
    }

    static login(body) {
        return Post({ url: LOGIN, body });
    }
}

export default PublicApi;