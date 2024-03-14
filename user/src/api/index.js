import axios from 'axios'
import { CgDatabase } from 'react-icons/cg'

const API = axios.create({
    baseURL: 'http://localhost:4000/api-v1/user',
    responseType: 'json'
})

export const apiRequest = async ({url, token, method, data}) => {
    try {
        const response = await API(url,{
            method: method || 'GET',
            data: data ?? {},
            headers:{
                "Content-Type" : "application/json", 
                Authorization: token ? `Bearer ${token}` : ''
            }
        })

        return response.data
    } catch (error) {
        console.log(error)
        const err = error.response?.data
        if(err.message === 'Authorization failed!'){
            localStorage.removeItem('user')
            window.location.reload('/login')
        }
        return{succes: err.succes, message: err.message}
    }
}


export const fetchUserCart = async (token) => {
    try {
        const response = await apiRequest({
            url: '/item/cart',
            token: token,
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const createUserPizza = async (token, data) => {
    try {
        const response = await apiRequest({
            url: '/item/create-pizza',
            method: 'POST',
            token: token,
            data: data
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (token, data) => {
    try {
        const response = await apiRequest({
            method: 'POST',
            url: '/item/create-order',
            data: data,
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const clearUserCart = async (token) => {
    try {
        const response = await apiRequest({
            method: 'POST',
            url: '/item/clear-cart',
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const addToUserCart = async (token, data) => {
    try {
        const response = await apiRequest({
            method: 'POST',
            url: '/item/add-cart',
            data: data,
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const userCartQuantty = async (token, data) => {
    try {
        const response = await apiRequest({
            method: 'POST',
            url: '/item/quantity',
            data: data,
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export const userOrders = async (token) => {
    try {
        const response = await apiRequest({
            url: '/item/orders',
            token: token
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

