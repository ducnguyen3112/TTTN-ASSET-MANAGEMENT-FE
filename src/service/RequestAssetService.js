import {AXIOS_API_URL} from "../constants/Axios";
import axios from "axios";

class RequestAssetService {
    createNewRequestAsset(data) {
        const url = AXIOS_API_URL + "/users/api/request-assets";
        return axios.post(
            url,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }
        )
    }

    getListRequestAssets(page, pageSize) {
        const url = AXIOS_API_URL + "/users/api/request-assets";
        return axios.get(
            url,
            {
                params: {
                    pageSize: pageSize,
                    page: page
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            },
        )
    }

    deleteRequestAsset(requestAssetId) {
        const url = AXIOS_API_URL + `/users/api/request-assets/${requestAssetId}`;
        return axios.delete(
            url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            },
        )
    }

    editRequestAsset(requestAssetId,data) {
        const url = AXIOS_API_URL + `/users/api/request-assets/${requestAssetId}`;
        return axios.put(
            url,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            },
        )
    }

    changeStateRequestAsset(requestAssetId,data) {
        const url = AXIOS_API_URL + `/admin/api/request-assets/${requestAssetId}/state`;
        return axios.put(
            url,
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            },
        )
    }
}

export default new RequestAssetService()