export async function autoUpdate() {
    const response = await fetch(`${import.meta.env.VITE_API_URI}/packages/autoupdate`, {
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