import commonAPI from './CommonAPI'
import { serverUrl } from './ServerUrl'



export const registerAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/register`,reqBody,"")
}

export const loginAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/login`,reqBody,"")
}

export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${serverUrl}/api/addProject`,reqBody,reqHeader)
}

export const homeProjectAPI=async()=>{
    return await commonAPI('get',`${serverUrl}/api/getHomeProject`,"","")
}

export const getAllUserProjectAPI=async(reqHeader,searchKey)=>{
    return await commonAPI('get',`${serverUrl}/api/getAllUserProject?search=${searchKey}`,"",reqHeader)
}

export const getAUserProjectAPI=async(reqHeader)=>{
    return await commonAPI('get',`${serverUrl}/api/getAUserProject`,"",reqHeader)
}

export const editProjectAPI=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI('put',`${serverUrl}/api/editProject/${projectId}`,reqBody,reqHeader)
}

export const deleteProjectAPI=async(projectId,reqHeader)=>{
    return await commonAPI('delete',`${serverUrl}/api/deleteProject/${projectId}`,"",reqHeader)
}
