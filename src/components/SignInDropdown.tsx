'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signIn } from "next-auth/react"
import { BsDiscord } from "react-icons/bs"

export default function SignInDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger id="sign-in-button-dd-trigger" asChild>
				<Button id="sign-in-button" variant={'outline'}>
					Sign In
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent id="sign-in-dd-content" className="w-56" align="end">
				<DropdownMenuItem id="sign-in-dd-content-item" onClick={() => signIn('discord')} className="cursor-pointer">
					<BsDiscord /> Log In with Discord
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}