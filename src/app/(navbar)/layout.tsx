'use client'
import { isCurrentUserAdmin } from "@/actions/db";
import Profile from "@/components/Profile";
import SignInDropdown from "@/components/SignInDropdown";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NavbarLayout({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession()

	const [ isAdmin, setIsAdmin ] = useState(false)
	const [ newPageTitle, setNewPageTitle ] = useState('')
	const [ createPageStatus, setCreatePageStatus ] = useState(0)
	const [ createPageStatusText, setCreatePageStatusText ] = useState('')
	const router = useRouter()

	useEffect(() => {
		isCurrentUserAdmin().then(res => {
			setIsAdmin(!!res)
		})
	}, [session])

	useEffect(() => {
		if (createPageStatus == 0) return
		setCreatePageStatus(0)

		if (createPageStatus == 200) {
			toast.success('News create', {
				description: `News page with title "${newPageTitle}" successfully created!`,
			})
		}
		else if (createPageStatus == 400) {
			toast.error('News create failed!', {
				description: createPageStatusText,
			})
		}
	}, [createPageStatus])

	const createNewPage = () => {
		fetch('/api/news/create', { body: newPageTitle, method: 'POST' }).then(res => {
			setCreatePageStatus(res.status)
			setCreatePageStatusText(res.statusText)
		})
	}

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
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant={'outline'}>
												Admin panel
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuSub>
												<DropdownMenuSubTrigger>New Page</DropdownMenuSubTrigger>
												<DropdownMenuPortal>
													<DropdownMenuSubContent>
														<div className="flex justify-center items-center gap-2">
															<Input minLength={3} maxLength={64} placeholder="New page title" onKeyDown={e => {if (e.code == 'Enter') createNewPage()}} onChange={e => setNewPageTitle(e.currentTarget.value)} />
															<Tooltip>
																<TooltipTrigger>
																	<Check className="size-6 cursor-pointer" onClick={createNewPage} />
																</TooltipTrigger>
																<TooltipContent>
																	Create new page
																</TooltipContent>
															</Tooltip>
															
														</div>
													</DropdownMenuSubContent>
												</DropdownMenuPortal>
											</DropdownMenuSub>
											<DropdownMenuItem onClick={() => router.push('/admin/editlist/1')}>
												Edit pages
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
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