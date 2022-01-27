import React from 'react'
import axios from "axios";
import useSWR, { useSWRConfig } from 'swr'
import { useRouter } from 'next/router'

//+ localStorage.getItem("token")
//const baseUrl = "https://dataflixapi.azurewebsites.net"
const baseUrl = process.env.ENV_VARIABLE === "production" ? "https://dataflixapi.azurewebsites.net" : "http://localhost:8080"
const fetcher = (url) =>
    axios
        .get(baseUrl + url, { headers: { Authorization: "Bearer " + localStorage.getItem("token")} })
        .then((res) => res.data)
        .catch((error) => {

            const status = new Error('An error occurred while fetching the data.')

            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                status.info = status.info;
                status.status = error.response.status;

            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
                status.info = {"message": "Error connecting to Server"};
                status.status = 500
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

            throw status;
        });

const options = { revalidateAll: true,}

const useService = (url, options) => {
    const router = useRouter()
    const { data, error } = useSWR(url, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Never retry on 404.
            if (error.status === 404) return

            if (error.status === 401) {
                // If we get a 401, we should retry.
                // This is a workaround for a bug in SWR that prevents
                // the revalidation from happening.
                //
                router.push("/login");
            }

            // Never retry for a specific key.
            if (key === url) return

            // Only retry up to 10 times.
            if (retryCount >= 10) return

            // Retry after 5 seconds.
            setTimeout(() => revalidate({ retryCount }), 5000)
        }})
    return {data, error}
}

export const useGetUsers = (path) => {
    const url = "/customer/" + path;

    const { data, error } = useService(url, options);

    return {data, error}
}



export const useGetAddress = (path) => {
    const url = "/address/" + path
    
    const { data, error } = useService(url, options);
    
    return {data, error}
}

export const useGetUser = () => {
    const url = "/customer/"
    
    const { data, error } = useService(url, options);

    return {data, error}
}


export const useGetMovies = (path) => {

    const url = "/movie/" + path
    
    const { data, error } = useService(url, options);

    return {data, error}
}

export const useGetSales = (path) => {

    const url = "/sale/" + path

    const { data, error } = useService(url, options);

    return {data, error}
}


export const useGetInventory = (path) => {

    const url = "/inventory/" + path

    const { data, error } = useService(url, options);
    
    return {data, error}
}


export const useGetCast = (path) => {
    const url = "/cast/" + path
    
    const { data, error } = useService(url, options);
    
    return {data, error}
}

export const useGetGenre = (path) => {
    const url = "/genre/" + path
    
    const { data, error } = useService(url, options);
    
    return {data, error}
}

export const useGetCustomer = (path) => {
    const url = "/customer/" + path
    
    const { data, error } = useService(url, options);

    return {data, error}
}

export const useGetReviews = (path) => {
    const url = "/review/" + path

    const { data, error } = useService(url, options);

    return {data, error}
}