export async function apiRequest(url, method = "GET", body = null) {
    try {
        const options = {
            method,
            headers: { "Content-Type": "application/json" },
        };

        if (body) {
            options.body = JSON.stringify(body);
            console.log("Body:",JSON.stringify(body));
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API request failed:", error);
        return { success: false, message: error.message };
    }
}
