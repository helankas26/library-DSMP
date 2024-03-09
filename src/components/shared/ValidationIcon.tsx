import React from "react";

const ValidationIcon: React.FC<{ isValid: boolean | undefined, loading: boolean }> = (props) => {

    if (props.isValid === undefined && !props.loading) {
        return (<></>);
    } else if (props.loading) {
        return (
            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V2.5a.5.5 0 00-1 0V4a1 1 0 01-1 1H4a.5.5 0 000 1h2.5a.5.5 0 000-1H4a1 1 0 01-1-1V2.5a.5.5 0 00-1 0V4c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8a.5.5 0 000 1c4.418 0 8 3.582 8 8v5.5a.5.5 0 001 0V12a8 8 0 01-8 8 .5.5 0 100 1 9 9 0 001-17 .5.5 0 00-1 0 8 8 0 01-1 16z"></path>
            </svg>
        );
    } else if (props.isValid) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>);
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"/>
            </svg>);
    }
}

export default ValidationIcon;