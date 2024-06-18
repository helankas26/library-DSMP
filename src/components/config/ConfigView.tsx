import React, {useCallback, useEffect, useState} from "react";

import ConfigCard from "./ConfigCard.tsx";
import ConfigUpdateCard from "./ConfigUpdateCard.tsx";
import useSnackbar from "../../hooks/use-snackbar.ts";
import useScrollToTop from "../../hooks/use-scroll-to-top.ts";
import Config from "../../model/Config.ts";
import configService from "../../services/api/config.ts";
import GradientCircularProgress from "../shared/GradientCircularProgress.tsx";

const ConfigView: React.FC = () => {
    const {showError} = useSnackbar();
    const {elementRef, scrollToTop} = useScrollToTop<HTMLDivElement>();

    const [configs, setConfigs] = useState<Config[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [toggleUpdate, setToggleUpdate] = useState<boolean>(false);
    const [updateConfig, setUpdateConfig] = useState<Config>();
    const [updateConfigProp, setUpdateConfigProp] = useState<string>('');
    const [updateType, setUpdateType] = useState<string>('');

    const loadConfigs = useCallback(async () => {
        try {
            const response = await configService.findAllConfigs();

            const {configs} = response.data;
            setConfigs(configs);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const configUpdateHandler = async (id: string, configProp: string, type: string) => {
        try {
            const response = await configService.findConfigById(id);
            const {config} = response.data;
            setUpdateConfig(config);
            setUpdateConfigProp(configProp);
            setUpdateType(type);
            setToggleUpdate(true);

            scrollToTop();
        } catch (error: any) {
            showError(error);
        }
    };

    const refreshAuthorsHandler = async () => {
        await loadConfigs();
    };

    useEffect(() => {
        loadConfigs();
    }, [loadConfigs]);

    return (
        <>
            <div ref={elementRef} className="pb-6">
                <div className="w-full">
                    <h2 className="text-gray-600 font-semibold">Configurations</h2>
                    <span className="text-xs">All Configuration</span>
                </div>
            </div>

            {toggleUpdate && updateConfig &&
                <div className="border rounded mb-6 flex justify-center">
                    <ConfigUpdateCard
                        key={updateConfigProp}
                        type={updateType}
                        setUpdateType={setUpdateType}
                        config={updateConfig}
                        setUpdateConfig={setUpdateConfig}
                        configProp={updateConfigProp}
                        setUpdateConfigProp={setUpdateConfigProp}
                        setToggleUpdate={setToggleUpdate}
                        onRefreshConfigs={refreshAuthorsHandler}/>
                </div>
            }

            <div className="flex flex-wrap justify-center min-w-full shadow border rounded-lg overflow-hidden">
                {isLoading &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <GradientCircularProgress/>
                    </div>
                }

                {!isLoading && configs.length === 0 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            No configurations were found.
                        </p>
                    </div>
                }

                {!isLoading && configs.length > 1 &&
                    <div className="w-full h-[60vh] flex justify-center items-center">
                        <p className="text-xl font-medium bg-[#3d9cd2] text-white w-4/5 p-3 rounded-sm border-l-8 border-l-[#347ba3]">
                            Too many configurations found. Contact support!
                        </p>
                    </div>
                }

                {!isLoading && configs.length === 1 &&
                    configs.map((config) => (
                        <React.Fragment key={config._id}>
                            <ConfigCard
                                type={"Admission"}
                                id={config._id}
                                config={config.admission}
                                configProp={"admission"}
                                updateHandler={configUpdateHandler}/>
                            <ConfigCard
                                type={"Subscription"}
                                id={config._id}
                                config={config.subscription}
                                configProp={"subscription"}
                                updateHandler={configUpdateHandler}/>
                            <ConfigCard
                                type={"Fine"}
                                id={config._id}
                                config={config.fine}
                                configProp={"fine"}
                                updateHandler={configUpdateHandler}/>
                            <ConfigCard
                                type={"No of Reservation"}
                                id={config._id}
                                config={config.noOfReservation}
                                configProp={"noOfReservation"}
                                updateHandler={configUpdateHandler}/>
                            <ConfigCard
                                type={"No of Borrow"}
                                id={config._id}
                                config={config.noOfBorrow}
                                configProp={"noOfBorrow"}
                                updateHandler={configUpdateHandler}/>
                            <ConfigCard
                                type={"Borrowable Date"}
                                id={config._id}
                                config={config.borrowableDate}
                                configProp={"borrowableDate"}
                                updateHandler={configUpdateHandler}/>
                        </React.Fragment>
                    ))

                }

            </div>
        </>
    );
}

export default ConfigView;