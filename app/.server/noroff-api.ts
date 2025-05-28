const API_BASE_URL = 'https://v2.api.noroff.dev';
const NOROFF_API_KEY = "72a1c703-80ba-45da-a12e-3fcc1efb2c64"

interface Image {
    url: string;
    alt: string;
}

interface BaseUser {
    name: string;
    email: string;
    avatar: Image;
    banner: Image;
}

interface LoginUser extends BaseUser {
    accessToken: string;
}

interface NoroffResponse<T> {
    data: T;
    meta: {};
}

export class NoroffClient {
    private accessToken: string | null = null;

    constructor(accessToken?: string) {
        if (accessToken) {
            this.accessToken = accessToken;
        }
    }


    async login(email: string, password: string): Promise<LoginUser> {
        const body = {
            email,
            password,
        }

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Noroff-API-Key": NOROFF_API_KEY,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json() as NoroffResponse<LoginUser>;

        this.accessToken = data.data.accessToken;

        return data.data;
    }
}

