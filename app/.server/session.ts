import { createCookieSessionStorage } from "react-router";

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

export {
    getSession,
    commitSession,
    destroySession
}