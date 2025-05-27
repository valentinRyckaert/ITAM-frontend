const URI: string = import.meta.env.VITE_API_URI

export async function getAllFromDB(ressourceName: string) {
    const response = await fetch(URI + `/${ressourceName}/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
    }

    return await response.json()
}

export async function getOneFromDB(ressourceName: string, ressourceId: number) {
    const response = await fetch(URI + `/${ressourceName}/${ressourceId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
    }

    return await response.json()
}

export async function postData(ressourceName:string, newRessource:object) {
    const response = await fetch(URI + `/${ressourceName}/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(newRessource)
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
    }
    const data = await response.json()
    return data
}

export async function putData(ressourceName:string, ressourceId: number, updatedRessource:Object) {
    const response = await fetch(URI + `/${ressourceName}/${ressourceId}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(updatedRessource)
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.stringify(errorData))
    }
    const data = await response.json()
    return data
}

export async function deleteData(ressourceName: string, ressourceId: number) {
    const response = await fetch(URI + `/${ressourceName}/${ressourceId}/delete`, {
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
    return data
}