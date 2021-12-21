import React from 'react'
import axios from "axios";
import useSWR, { useSWRConfig } from 'swr'

//+ localStorage.getItem("token")
//const baseUrl = "https://dataflixapi.azurewebsites.net"
const baseUrl = "http://localhost:8080"
const fetcher = (url) =>
    axios
        .get(baseUrl + url, { headers: { Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NCxhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImRhdGFmbGl4LmlvIiwiaWF0IjoxNjM5ODA4MTM1LCJleHAiOjE2NDA0MTI5MzV9.wapxqXx3Umm5r76pT0mw6k9fq0PgnJNElHFk22DIdRhx19tfAnJjJ5uNUDqRPgygHZeETCQI4FHANCNH_jjy5g" } })
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
                status.info = error.response.data;
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

export const useGetUsers = (path) => {

    const url = "/customer/" + path
    const { data, error } = useSWR(url, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Never retry on 404.
            if (error.status === 404) return

            // Never retry for a specific key.
            if (key === url) return

            // Only retry up to 10 times.
            if (retryCount >= 10) return

            // Retry after 5 seconds.
            setTimeout(() => revalidate({ retryCount }), 5000)
        }})

    return {data, error}
}

export const useGetUser = () => {

    const url = "/customer/"
    const { data, error } = useSWR(url, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Never retry on 404.
            if (error.status === 404) return

            // Never retry for a specific key.
            if (key === url) return

            // Only retry up to 10 times.
            if (retryCount >= 10) return

            // Retry after 5 seconds.
            setTimeout(() => revalidate({ retryCount }), 5000)
        }})

    return {data, error}
}


export const useGetMovies = (path) => {

    const url = "/movie/" + path
    const { data, error } = useSWR(url, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Never retry on 404.
            if (error.status === 404) return

            // Never retry for a specific key.
            if (key === url) return

            // Only retry up to 10 times.
            if (retryCount >= 10) return

            // Retry after 5 seconds.
            setTimeout(() => revalidate({ retryCount }), 5000)
        }})

    return {data, error}
}

export const useGetSales = (path) => {

    const url = "/sale/" + path
    console.log(url)
    const { data, error } = useSWR(url, fetcher, {
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            // Never retry on 404.
            if (error.status === 404) return

            // Never retry for a specific key.
            if (key === url) return

            // Only retry up to 10 times.
            if (retryCount >= 10) return

            // Retry after 5 seconds.
            setTimeout(() => revalidate({ retryCount }), 5000)
        }})

    return {data, error}
}