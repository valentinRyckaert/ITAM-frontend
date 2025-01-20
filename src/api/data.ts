const URI: string = "http://localhost:8000/";

export async function getAllFromDB(txt: string) {
    const response = await fetch(URI + `${txt}/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
}