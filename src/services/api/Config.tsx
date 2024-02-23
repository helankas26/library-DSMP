import AxiosInstance from "../../config/AxiosInstance.ts";
import HttpResponse from "../../utils/HttpResponse.ts";
import Config from "../../model/Config.tsx";


const CONFIGS: string = '/configs';

const findAllConfigs = async () => {
    return await AxiosInstance.get<HttpResponse<Config>>(CONFIGS);
}

const createConfig = async (config: Config) => {
    return await AxiosInstance.post<HttpResponse<Config>>(CONFIGS, {config});
}

const findConfigById = async (id: string) => {
    return await AxiosInstance.get<HttpResponse<Config>>(`${CONFIGS}/${id}`);
}

const updateConfig = async (id: string, config: Config) => {
    return await AxiosInstance.patch<HttpResponse<Config>>(`${CONFIGS}/${id}`, {config});
}

const deleteConfig = async (id: string) => {
    return await AxiosInstance.delete<{ id: string }>(`${CONFIGS}/${id}`);
}

export default {
    findAllConfigs,
    createConfig,
    findConfigById,
    updateConfig,
    deleteConfig
};