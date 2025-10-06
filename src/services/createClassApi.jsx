import { authFetch } from "./authFetch";

export async function createClassroom(data, token) {
        const response = await authFetch("http://localhost:8080/api/teacher", {
        method: "POST",
        body: JSON.stringify(data),
        });

    if(!response.ok) {
        const message = await response.text();
        throw new Error(message || "Create classroom failed")
    }
    return await response.text()
}