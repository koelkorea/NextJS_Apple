import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: '플렛폼1에서 발급받은ID',
            clientSecret: '플렛폼1에서 발급받은Secret',
        }),

    ],
    secret : 'jwt생성시쓰는암호'
};

export default NextAuth(authOptions); 