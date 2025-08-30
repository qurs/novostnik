'use client'
import { isCurrentUserAdmin } from "@/actions/db";
import Profile from "@/components/Profile";
import SignInDropdown from "@/components/SignInDropdown";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function NavbarLayout({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession()

	const [ isAdmin, setIsAdmin ] = useState(false)

	useEffect(() => {
		isCurrentUserAdmin().then(res => {
			setIsAdmin(res)
		})
	}, [session])

	return (
		<>
			<div className="flex w-full justify-between p-2 bg-gray-900">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink href="/">Home</NavigationMenuLink>
						</NavigationMenuItem>

						{
							isAdmin && (
								<NavigationMenuItem>
									<NavigationMenuLink href="/admin">Admin panel</NavigationMenuLink>
								</NavigationMenuItem>
							)
						}
					</NavigationMenuList>
				</NavigationMenu>

				<NavigationMenu>
					<NavigationMenuList>
						{ 
						session && (
							<NavigationMenuItem>
								<Profile session={session}></Profile>
							</NavigationMenuItem>
						) || (
							<NavigationMenuItem>
								<SignInDropdown />
							</NavigationMenuItem>
						)
						}
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			{children}
		</>
	)
}