type DelayFunction = (attempt: number) => Promise<number> | number;
type RetryFunction = (
    attempt: number,
    error: unknown,
) => boolean | Promise<boolean>;

interface FetchWithRetryOtions extends RequestInit {
    retries?: number;
    retryDelay?: number | DelayFunction;
    retry?: boolean | RetryFunction;
    timeout?: number;
}

export async function fetchWithRetry(
    url: string,
    options: FetchWithRetryOtions,
): Promise<Response> {
    const {
        retries = 3,
        retry = true,
        retryDelay = (attempt: number) => Math.min(1000 * 2 ** attempt, 30_000),
        timeout,
        ...fetchOptions
    } = options;

    let attempt = 0;

    const shouldRetry = async (err: unknown) => {
        if (typeof retry === 'boolean') return retry;
        return retry(attempt, err);
    };

    const getDelay = async () => {
        if (typeof retryDelay === 'number') return retryDelay;
        return retryDelay(attempt);
    };

    const controller = new AbortController();
    const timeoutId =
        timeout &&
        setTimeout(() => {
            controller.abort();
        }, timeout);

    while (true) {
        try {
            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal,
            });

            //this means that the HTTPS code is somehwre in 400 or 500
            //400 is client error which can happen on DNS connection, request timeout, internet connection
            //500 is server error which can happen server side
            if (!response.ok && attempt < retries) {
                throw new Error(`HTTP error ${response.status}`);
            }

            if (timeoutId) clearTimeout(timeoutId);
            return response;
        } catch (error) {
            attempt++;

            if (!(await shouldRetry(error)) || attempt > retries) {
                if (timeoutId) clearTimeout(timeoutId);
                throw error;
            }

            const delay = await getDelay();
            await new Promise((res) => setTimeout(res, delay));
        }
    }
}
