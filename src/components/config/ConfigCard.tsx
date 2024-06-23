import React from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import UpdateButton from "../shared/UpdateButton.tsx";

const ConfigCard: React.FC<{
    type: string;
    id: string;
    config: any;
    configProp: string;
    updateHandler: (id: string, configProp: string, type: string) => void
}> = (props) => {
    const {type, id, config, configProp, updateHandler} = props;

    const configUpdateHandler = async (id: string) => {
        updateHandler(id, configProp, type);
    };

    return (
        <div className="w-full m-2 my-8 max-w-sm rounded-lg bg-gray-600 pl-6 pr-12 py-6 shadow-xl flex items-center justify-between">
            <div className="flex flex-col">
                <div className="flex space-x-2 items-center">
                    <SettingsRoundedIcon fontSize="large" className="text-green-400"/>
                    <p className="font-semibold text-xl text-white">{type}</p>
                </div>
                <div className="flex flex-col gap-1 ml-10">
                    <div className="bg-cyan-100 rounded-md p-1 text-center w-[70px]">
                        <p className="text-cyan-600 font-semibold text-sm">{config.fee ? config.fee.toFixed(2) : config.count}</p>
                    </div>
                    <p className="font-semibold text-xs text-gray-200">{config.librarian?.fullName}</p>
                </div>
            </div>
            <UpdateButton id={id} onUpdate={configUpdateHandler}/>
        </div>
    );
}

export default ConfigCard;