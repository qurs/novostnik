'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import NewsCard from "./NewsCard"
import { fetchPinnedNews } from "@/actions/news"
import { useState, useEffect } from "react"
import { News } from "@/generated/client"
import { Montserrat } from "next/font/google"
import { useRouter } from "next/navigation"

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
})

export default function PinnedNewsCarousel() {
	const [pinnedNews, setPinnedNews] = useState<News[]>([])

	const router = useRouter()

	useEffect(() => {
		fetchPinnedNews().then((data) => {
			setPinnedNews(data)
		})
	}, [])

	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<h1 className={`${montserrat.className} text-base xs:text-2xl sm:text-3xl text-center font-bold mx-auto`}>Pinned news</h1>
			<Carousel className="w-[50vw] sm:w-sm md:w-md lg:w-lg">
				<CarouselContent>
					{pinnedNews.map((news: News) => (
						<CarouselItem key={news.id}>
							<NewsCard onClick={() => router.push(`/news/${news.slug}`)} title={news.title} image={news.image} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}