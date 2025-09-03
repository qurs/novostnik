import { News } from "@/generated/client";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import NewsCard from "./NewsCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { fetchNews, fetchNewsMaxPage } from "@/actions/db";
import { EDIT_LIST_PAGE_SIZE } from "@/configs/generic";
import { Montserrat } from "next/font/google";
import CategoryCombobox from "./CategoryCombobox";

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
})

export default function MainNewsList() {
	const pageSize = EDIT_LIST_PAGE_SIZE

	const router = useRouter()
	const searchParams = useSearchParams()
	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1

	const [ maxPage, setMaxPage ] = useState(1)
	const [ newsList, setNewsList ] = useState<News[]>([])
	const [ isLoading, setIsLoading ] = useState(true)
	const [ selectedCategory, setSelectedCategory ] = useState('')

	useEffect(() => {
		setIsLoading(true)
		fetchNewsMaxPage(pageSize).then(resMaxPage => {
			const date = new Date()
			setMaxPage(resMaxPage)
			fetchNews(page, pageSize, { draft: false, isPinned: false, publishedAt: {
				lte: date,
			} }).then(resNews => {
				setNewsList(resNews.sort((a, b) => (b.publishedAt!.getTime() - a.publishedAt!.getTime())))
				setIsLoading(false)
			})
		})
	}, [page])

	const list = useMemo(() => {
		if (selectedCategory) {
			return newsList.filter(news => news.categoryId === selectedCategory)
		}
		else {
			return newsList
		}
	}, [selectedCategory, newsList])

	const newsCardSizeClassName = "rounded-xl w-16 h-16 xxxs:w-18 xxxs:h-18 xxs:w-22 xxs:h-22 xs:w-30 xs:h-30 sm:w-38 sm:h-38 md:w-46 md:h-46 lg:w-76 lg:h-76"

	return (
		<div id='main-news-list' className="flex flex-col p-1 justify-between items-stretch gap-1 w-full min-h-[80vh] bg-gray-900 rounded-2xl">
			<CategoryCombobox onSelect={setSelectedCategory} />
			<div id="main-page-content" className="flex flex-wrap gap-1 p-1 xxxs:gap-2 xxxs:p-2 sm:gap-5 sm:p-5 md:gap-8 md:p-8 justify-between lg:justify-center items-center w-full h-auto">
				{
					(!isLoading && list && list.length > 0) && ( list.map(news => (
						<NewsCard key={news.id} title={news.title} image={news.image} onClick={() => router.push(`/news/${news.slug}`)} />
					)) )
					|| (!isLoading && list && list.length < 1) && ( 
						<>
							<h1 className={`${montserrat.className} w-full text-center font-bold text-lg xxs:text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>No news found.</h1>
						</>
					)
					||
					(
						<>
							<Skeleton className={newsCardSizeClassName} />
							<Skeleton className={newsCardSizeClassName} />
							<Skeleton className={newsCardSizeClassName} />
							<Skeleton className={newsCardSizeClassName} />
							<Skeleton className={newsCardSizeClassName} />
							<Skeleton className={newsCardSizeClassName} />
							<Skeleton className={newsCardSizeClassName} />
						</>
					)
				}
			</div>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href={page > 1 && `/?page=${page - 1}` || '#'} />
					</PaginationItem>

					{page > 1 &&
						<PaginationItem>
							<PaginationLink href={`/?page=${page - 1}`}>{page - 1}</PaginationLink>
						</PaginationItem>
					}
					
					<PaginationItem>
						<PaginationLink href='#' isActive>{page}</PaginationLink>
					</PaginationItem>

					{page < maxPage &&
						<PaginationItem>
							<PaginationLink href={`/?page=${page + 1}`}>{page + 1}</PaginationLink>
						</PaginationItem>
					}

					{maxPage - page > 1 && <>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href={`/?page=${maxPage}`}>{maxPage}</PaginationLink>
						</PaginationItem>
					</>}
					
					<PaginationItem>
						<PaginationNext href={page < maxPage && `/?page=${page + 1}` || '#'} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}