import { createAuthClient } from "better-auth/react"

function resolveAuthBaseUrl() {
    const url =
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
        process.env.NEXT_PUBLIC_APP_URL;

    if (url) {
        return url.replace(/\/$/, "");
    }

    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    return process.env.BETTER_AUTH_URL;
}

export const authClient = createAuthClient({
    /** Prefer explicit env URLs; fallback to current origin in browser. */
    baseURL: resolveAuthBaseUrl(),
})

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
