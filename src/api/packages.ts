export async function autoUpdate() {
    const response = await fetch('http://localhost:8000/packages/autoupdate', {
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