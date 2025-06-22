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

interface Profile extends BaseUser{
    bio: string;
    credits: number;
    "_count":{
        listings: number;
        wins: number;
    }
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

    async getProfile(id: string): Promise <Profile>{
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.accessToken}`,
                "X-Noroff-API-Key": NOROFF_API_KEY,
            },
        });
        if (response.status===404){
            throw new Response("User not found", {
                status: 404
            });
        }
        if (!response.ok) {
            throw new Response('Failed getting user profile',{
                status: 500
            });
        }

        const data = await response.json() as NoroffResponse<Profile>;

        return data.data;
    }
}

