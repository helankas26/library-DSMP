import React from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";

const ConfigUpdateCard: React.FC<{ title: string }> = (props) => {
    return (

        <div
            className="w-full m-2 my-8 max-w-xl rounded-lg bg-stone-400 pl-6 pr-12 py-6 shadow-xl flex items-center justify-between">
            <div className="flex flex-col">
                <div className="flex space-x-2 items-center">
                    <SettingsRoundedIcon fontSize="large" className="text-green-700"/>
                    <p className="font-semibold text-xl text-white">{props.title}</p>
                </div>
                <div className="flex flex-col gap-1 ml-10">
                    <div className="bg-cyan-100 rounded-md p-1 text-center w-[120px]">
                        <p className="text-cyan-600 font-semibold text-md">Pre: {300.00}</p>
                        <input type="number"
                               className="appearance-none border rounded-md w-full py-1 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>
                    </div>
                    <p className="font-semibold text-sm text-gray-200">Helanka</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
                <UpdateRecordButton/>
                <CancelButton/>
            </div>
        </div>
    );
}

export default ConfigUpdateCard;