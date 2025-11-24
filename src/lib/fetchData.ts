export async function fetchData<T>(
    url: string,
    options: RequestInit,
): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTPS Error with status ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}
