import { createCookieSessionStorage, href, redirect } from "react-router";

interface SessionData {
    userName: string;
    accessToken: string;
}

interface SessionFlashData {
    error: string;
}

const {
    getSession,
    commitSession,
    destroySession,
} = createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
        name: "__session"
    }

});

export async function getUser(r: Request){
    const cookies = r.headers.get("Cookie");
    if (!cookies){
        throw redirect(href("/login"));
    }
    const session = await getSession(cookies);
    const userName = session.get("userName")
    const accessToken = session.get("accessToken")
    if(!userName || !accessToken){
        throw redirect(href("/login"));
    }
    return {
        userName,
        accessToken
    }
}

export {
    getSession,
    commitSession,
    destroySession
}