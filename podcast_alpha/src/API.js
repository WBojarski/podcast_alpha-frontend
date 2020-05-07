const BASE_URL = "http://localhost:3000"

// PUBLIC FETCHES
function logIn = (credentials) => {
    return
}


// PRIVATE FETCHES
function privateFetch(url, options) {
    return fetch(url, {
        method: options.method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            ...options.headers,
        },
        body: JSON.stringify(options.body)
    })
}

export {
    logIn,
    signUp,
}