import {useEffect, useState} from "react";
import SnackbarServiceProps from "../model/SnackbarServiceProps.ts";

let listener: any;

const useException = (shouldListen = false) => {
    const [error, setError] = useState<SnackbarServiceProps>();

    const handleException = (err: any) => {
        let message: string;

        if (err.response) {
            message = err.response.data.message;
        } else if (err.request) {
            message = err.request.message;
        } else {
            message = err.message;
        }

        listener({
            message: message,
            isOpen: true,
            severity: 'error',
            onClear: () => {
                listener(undefined);
            }
        });
    };

    useEffect(() => {
        if (shouldListen) {
            listener = setError;
        }

        return () => {
            if (shouldListen) {
                listener = undefined;
            }
        };

    }, [setError, shouldListen]);


    return {error, handleException};
}

export default useException;