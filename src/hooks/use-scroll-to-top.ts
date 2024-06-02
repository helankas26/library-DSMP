import {useCallback, useRef} from "react";

const useScrollToTop = <T extends HTMLElement>() => {
    const elementRef = useRef<T>(null);

    const scrollToTop = useCallback(() => {
        if (elementRef.current) {
            elementRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        } else {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }, []);

    return {elementRef, scrollToTop};
};

export default useScrollToTop;

