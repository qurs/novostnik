"use client"

import { Session } from "next-auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"

interface ProfileProps {
	session: Session
}

export default function Profile({
  session: { user }
}: ProfileProps ) {
  return (
	<DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar className="w-10 h-10 border-2 border-white/50">
        <AvatarImage src={user!.image!} alt={user!.name!} />
        <AvatarFallback>{user!.name!}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="m-0" align="end" side="bottom">

      <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer">
        Log Out
      </DropdownMenuItem>
    </DropdownMenuContent>
	</DropdownMenu>
  )
}