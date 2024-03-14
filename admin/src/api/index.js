import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:4000/api-v1/admin',
    responseType: 'json'
})

export const apiRequest = async ({url, token, data, method}) =>{
    try {
        const response = await API(url,{
            method: method || 'GET',
            data: data,
            headers:{
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : ''
            }
        })

        return response?.data
    } catch (error) {
        console.log(error)
        const err = error?.response?.data
        if(err.message === 'Authorization failed!'){
            localStorage.removeItem('admin')
            window.alert('session expired')
            window.location.reload('/login')
        }
        return {success: err.success, message: err.message}
    }
}

export const getItems = async (token) => {
    try {
        const response = apiRequest({
            url: '/item/get-items',
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const addItem = async (token, data)=>{
    try {
        const response = await apiRequest({
            url: '/item/create-type',
            method: 'POST',
            data: data,
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateStock = async (token, data) =>{
    try {
        const response = await apiRequest({
            url: '/item/update-item',
            method: 'PUT',
            data: data,
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const createItems = async (token, data) => {
    try {
        const response = await apiRequest({
            url: '/item/create-item',
            method: 'POST',
            data: data,
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (token) => {
    try {
        const response = apiRequest({
            url: '/item/get-users',
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const fetchOrders = async (token) => {
    try {
        const response = apiRequest({
            url: '/item/get-orders',
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateOrder = async (token, data) => {
    try {
        const response = apiRequest({
            url: '/item/update-order',
            method: 'PUT',
            data: data,
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}