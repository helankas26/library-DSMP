import React from "react";

const OverdueDatesLabel: React.FC<{ lateDates: number }> = (props) => {

    let labelColor: string = '';

    if (props.lateDates > 0) {
        labelColor = 'text-white bg-red-500 font-bold';
    }

    return (
        <span
            className={`text-center align-baseline inline-flex px-3.5 py-2.5 mr-auto items-center leading-none rounded-full ${labelColor}`}>
            {props.lateDates}
        </span>
    );
}

export default OverdueDatesLabel;