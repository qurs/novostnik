'use client'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { FilePlus2, SquarePen } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPageContent() {
	const router = useRouter()
	return (
		<>
			<div className="flex flex-col gap-30 xs:gap-15 sm:flex-row justify-center items-center rounded-xl min-h-[75vh] m-5 xxxs:m-8 xs:m-10 sm:m-15 md:mx-15 md:mt-15 lg:mt-20 bg-stone-900/50">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button onClick={() => router.push('/admin/create')} size={"icon"} className="size-32 xs:size-48" variant={"secondary"}>
							<FilePlus2 className="size-24 xs:size-32" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Add news page</p>
					</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button onClick={() => router.push('/admin/editlist')} size={"icon"} className="size-32 xs:size-48" variant={"secondary"}>
							<SquarePen className="size-24 xs:size-32" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Edit news pages</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</>
	)
}