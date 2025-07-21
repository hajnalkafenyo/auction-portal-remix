export interface Image {
    url: string;
    alt: string;
}

export interface BaseUser {
    name: string;
    email: string;
    avatar: Image;
    banner: Image;
}

export interface LoginUser extends BaseUser {
    accessToken: string;
}

export interface NoroffResponse<T> {
    data: T;
    meta: {};
}

export interface Profile extends BaseUser{
    bio: string;
    credits: number;
    "_count":{
        listings: number;
        wins: number;
    }
}

export interface Listing {
    id: string;
    title: string;
    description: string;
    tags:string[];
    media: Image[];
    created: string;
    updated: string;
    endsAt: string;
    "_count":{
        bids: number;
    }
    bids: Bid[];
    seller: PublicProfile;
}

export interface PublicProfile extends BaseUser{
    bio: string;
    email: string;
}

export interface Bid{
    amount: number;
    bidder: PublicProfile;
    id: string;
    created: Date;

}

