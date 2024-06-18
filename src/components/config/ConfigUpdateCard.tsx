import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import {Form} from "react-router-dom";

import UpdateRecordButton from "../shared/UpdateRecordButton.tsx";
import CancelButton from "../shared/CancelButton.tsx";
import Config from "../../model/Config.ts";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useAuth from "../../hooks/use-auth.ts";
import configService from "../../services/api/config.ts";

const ConfigUpdateCard: React.FC<{
    type: string;
    setUpdateType: Dispatch<SetStateAction<string>>;
    config: Config;
    setUpdateConfig: Dispatch<SetStateAction<Config | undefined>>;
    configProp: string;
    setUpdateConfigProp: Dispatch<SetStateAction<string>>;
    setToggleUpdate: Dispatch<SetStateAction<boolean>>;
    onRefreshConfigs: () => Promise<void>
}> = (props) => {
    const {
        type,
        setUpdateType,
        config,
        setUpdateConfig,
        configProp,
        setUpdateConfigProp,
        setToggleUpdate,
        onRefreshConfigs
    } = props;
    const {auth} = useAuth();
    const {showError, showAlert} = useSnackbar();

    const [value, setValue] = useState<number>((config as any)[configProp].fee || (config as any)[configProp].count);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const updateConfigHandler = async (event: FormEvent) => {
        event.preventDefault();

        setIsUpdating(true);

        const editedConfig: Config = {
            [configProp]: (config as any)[configProp].fee !== undefined ? {fee: value} : {count: value}
        } as unknown as Config;

        try {
            await configService.updateConfig(config._id, editedConfig);
            showAlert(`${type} config updated successfully!`, "success");
            await onRefreshConfigs();
            setToggleUpdate(false);
            setUpdateConfig(undefined);
            setUpdateConfigProp('');
            setUpdateType('');
        } catch (error: any) {
            showError(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const cancelUpdateHandler = () => {
        setToggleUpdate(false);
        setUpdateConfig(undefined);
        setUpdateConfigProp('');
        setUpdateType('');
    };

    return (
        <div className="w-full m-2 my-8 max-w-xl rounded-lg bg-stone-400 pl-6 pr-12 py-6 shadow-xl">
            <Form className="flex items-center justify-between" onSubmit={updateConfigHandler}>
                <div className="flex flex-col">
                    <div className="flex space-x-2 items-center">
                        <SettingsRoundedIcon fontSize="large" className="text-green-700"/>
                        <p className="font-semibold text-xl text-white">{type}</p>
                    </div>
                    <div className="flex flex-col gap-1 ml-10">
                        <div className="bg-cyan-100 rounded-md p-1 text-center w-[120px]">
                            <p className="text-cyan-600 font-semibold text-md">Prev: {(config as any)[configProp].fee}</p>
                            <input
                                className="appearance-none border rounded-md w-full py-1 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                id="value"
                                type="number"
                                step={1}
                                min={0}
                                value={value}
                                onChange={(e) => {
                                    setValue(parseInt(e.target.value));
                                }}
                                required={true}/>
                        </div>
                        <p className="font-semibold text-sm text-gray-200">{auth.profile?.fullName}</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-5">
                    <UpdateRecordButton isUpdating={isUpdating}/>
                    <CancelButton isUpdating={isUpdating} onCancel={cancelUpdateHandler}/>
                </div>
            </Form>
        </div>
    );
}

export default ConfigUpdateCard;