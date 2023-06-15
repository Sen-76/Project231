import axios from "axios";

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        const status: number = error.response.status;
        if (status) {
            switch (status) {
                case 401:
                    const logoutLink = document.querySelector("externals-logout-link") as HTMLLinkElement;
                    if (logoutLink) {
                        logoutLink.click();
                    } else {
                        var form = document.querySelector("logoff-form") as HTMLFormElement;
                        if (form) {
                            form.submit();
                        }
                    }
                    break;
                case 403:
                    throw new Error("403");
                case 404:
                    throw new Error("404");
                case 400:
                    window.location.href = `/pages/error?code=404`
                    break;
                case 500:
                    const code = error.config?.header["x-correlation-id"];
                    window.location.href = `/pages/error?code=${code}`
                    break;
                default: throw "error";
            }
        }
    }
)

// function request<T>(url: string, method: string, config?: AxiosRequestConfig, hostAttachment: boolean = false){
// }

// export function get<T>(url: string, config?: AxiosRequestConfig){
//     return request<T>(url, 'get', config)
// }

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path: any, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export default httpRequest;