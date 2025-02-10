const URI: string = "http://localhost:8000/auth/"

// Function to log in and store the token
export async function login(username: string, password: string) {
    const response = await fetch(URI + 'login/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: "password",
            username: username,
            password: password,
            client_id: "string",
            client_secret: "string"
        }).toString()
    })
    
    if (!response.ok) {
        const errorData = await response.json()
        return JSON.stringify(errorData)
    }

    const data = await response.json()
    localStorage.setItem('authToken', data.access_token)
    return data
}

export function logout() {
    localStorage.removeItem('authToken')
}

export async function getCurrentUser() {

    const response = await fetch(URI + 'me/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
    }

    let data = await response.json()
    return data
}
