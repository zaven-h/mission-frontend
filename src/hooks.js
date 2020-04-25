import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "./queries";

export const useIsLoggedIn = () => {
    const { loading, error, data } = useQuery(GET_CURRENT_USER);

    if (loading || error) {
        return false;
    }

    if (data.currentUser) {
        return true;
    } else {
        return false;
    }
};
