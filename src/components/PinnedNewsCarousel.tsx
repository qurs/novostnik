'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import NewsCard from "./NewsCard"
import { useState, useEffect } from "react"
import { News } from "@/generated/client"
import { Montserrat } from "next/font/google"
import { useRouter } from "next/navigation"
import { Skeleton } from "./ui/skeleton"
import { fetchPinnedNewsFromDB } from "@/actions/db"

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
})

export default function PinnedNewsCarousel() {
	const [pinnedNews, setPinnedNews] = useState<News[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const router = useRouter()

	useEffect(() => {
		fetchPinnedNewsFromDB().then((data) => {
			setIsLoading(false)
			setPinnedNews(data)
		})
	}, [])

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<h1 className={`${montserrat.className} text-base xs:text-2xl sm:text-3xl text-center font-bold mx-auto`}>Pinned news</h1>
			<Carousel className="w-[50vw] sm:w-sm md:w-md lg:w-lg">
				<CarouselContent>
					{
						!isLoading && pinnedNews.map((news: News) => (
								<CarouselItem key={news.id}>
									<NewsCard onClick={() => router.push(`/news/${news.slug}`)} title={news.title} image={news.image} />
								</CarouselItem>
							))
						|| (
							<CarouselItem>
								<Skeleton className="rounded-xl h-full min-h-16 max-h-32 tiny:max-h-48 xxxs:max-h-64 xxs:min-h-32 xxs:max-h-96 xs:min-h-64 xs:max-h-96 sm:max-h-128" />
							</CarouselItem>
						)
					}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}