import {useOutletContext} from "react-router-dom";

import HomeStateContext from "../model/HomeStateContext.ts";

const useHomeState = () => {
    return useOutletContext<HomeStateContext>();
}

export default useHomeState;