const URI: string = "http://localhost:8000/files"

export async function postFile(newRessource:Object) {
    const response = await fetch(URI, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: newRessource.toString()
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
    }
    const data = await response.json()
    localStorage.setItem('authToken', data.access_token)
    return data
}

export async function deleteFile(filename: number) {
    const response = await fetch(URI + `${filename}/delete`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
    }
    const data = await response.json()
    localStorage.setItem('authToken', data.access_token)
    return data
}