'use client'

import { News } from "@/generated/client"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"
import NewsCard from "./NewsCard"
import { useRouter } from "next/navigation"

export default function AdminEditListContent({
	page,
	maxPage,
	news
}: {
	page: number,
	maxPage: number
	news: News[],
}) {
	const router = useRouter()

	return (
		<div className="flex flex-col mt-5 p-3 gap-5 justify-between rounded-xl min-h-[85vh] bg-stone-900/50">
			<div className="grid grid-cols-1 tiny:grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
				{news.map((news: News, index) => (
					<NewsCard onClick={() => router.push(`/admin/edit/${news.id}`)} key={index} title={news.title} image={news.image} />
				))}
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href={page > 1 && `/admin/editlist/${page - 1}` || '#'} />
					</PaginationItem>

					{page > 1 &&
						<PaginationItem>
							<PaginationLink href={`/admin/editlist/${page - 1}`}>{page - 1}</PaginationLink>
						</PaginationItem>
					}
					
					<PaginationItem>
						<PaginationLink href='#' isActive>{page}</PaginationLink>
					</PaginationItem>

					{page < maxPage &&
						<PaginationItem>
							<PaginationLink href={`/admin/editlist/${page + 1}`}>{page + 1}</PaginationLink>
						</PaginationItem>
					}

					{maxPage - page > 1 && <>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href={`/admin/editlist/${maxPage}`}>{maxPage}</PaginationLink>
						</PaginationItem>
					</>}
					
					<PaginationItem>
						<PaginationNext href={page < maxPage && `/admin/editlist/${page + 1}` || '#'} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}