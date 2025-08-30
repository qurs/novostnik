'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signIn } from "next-auth/react"
import { BsDiscord } from "react-icons/bs"

export default function SignInDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'outline'}>
					Sign In
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuItem onClick={() => signIn('discord')} className="cursor-pointer">
					<BsDiscord /> Log In with Discord
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}