import { type AuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";

export const AuthConfig = ({
	providers: [
		Discord({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
		})
	]
	
}) as AuthOptions