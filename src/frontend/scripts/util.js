import store from "@/store";
import router from "../router.js";

export function getSearchFilter(searchFilter) {
    return typeof searchFilter !== "string"
        ? searchFilter.toString()
        : searchFilter.trim().toLocaleLowerCase();
}

export function initCap(str) {
    if (!str) {
        return ""; // Handle empty or null strings
    }

    return str
        .toLowerCase() // Convert the entire string to lowercase first
        .split(" ") // Split the string into an array of words
        .map((word) => {
            if (word.length === 0) {
                return ""; // Handle empty words resulting from multiple spaces
            }
            // Capitalize the first letter and concatenate with the rest of the word
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" "); // Join the words back into a single string
}
export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
};

/**
 * Handles errors from API calls.
 * Displays a flash message and redirects to the login page if the error is 401.
 * @param {Object} error - The error object from the API call.
 */

export function handleCatchError(error = null, response = null) {
    const statusCode = error ? error.response.status : response.status;
    store.commit(
        "setStatus",
        {
            class: "bg-danger",
            error: true,
            errorCode: statusCode,
            message: error
                ? error.response.data.message
                : response.data.message,
        },
        { root: true }
    );
    store.commit("setFlashMessage", true, { root: true });
    if (statusCode === 403 || statusCode === 400 || statusCode === 401) {
        // connection not allowed to oracle server

        router.replace(`/error/${statusCode}`);
    }
}

export function handleSuccessResponse(
    errorCode = "",
    message = "",
    responseClass = "",
    flashMessage = false
) {
    store.commit(
        "setStatus",
        {
            error: false,
            errorCode,
            message,
            class: responseClass,
        },
        { root: true }
    );
    store.commit("setFlashMessage", flashMessage, { root: true });
}

export function getAuthToken() {
    return store.getters.authToken;
}

export function getUserName() {
    return store.state.customer.userName;
}

function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
}

export function checkTokenValidity(token) {
    if (token) {
        const jwtPayload = parseJwt(token);

        if (jwtPayload.exp < Date.now() / 1000) {
            return "TOKEN_EXPIRED";
        }
    } else {
        return "TOKEN_INVALID";
    }
    return "TOKEN_VALID";
}
