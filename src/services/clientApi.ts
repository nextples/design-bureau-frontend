
export abstract class ClientApi {

    public async request<T>(url: string, options: RequestInit = {}): Promise<T> {

        console.log(`Making request to: ${url}`);
        console.log('Request options:', options);

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            console.log(`Response status: ${response.status}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            if (response.status === 204) {
                return {} as T;
            }

            const data = await response.json();
            console.log('Response data:', data);
            return data;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    }
}