// 1 importing axios
import axios from 'axios'

// 2 configure the axios. this common api is used in every api fetching
const commonAPI = async (httpMethod, url, reqBody,reqHeader) => {
    const reqConfig = { 
        method: httpMethod,
        url: url,
        data: reqBody,
        headers:reqHeader?reqHeader:{
            "Contents-Type":"application/json"
        }
    };

    return await axios(reqConfig).then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

export default commonAPI;