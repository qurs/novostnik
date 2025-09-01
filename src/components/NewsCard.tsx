import { Montserrat } from "next/font/google"
import Image from "next/image"

interface NewsCardCardProps {
	title: string
	image: string
	onClick?: () => void
}

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
})

export default function NewsCard({
	title,
	image,
	onClick,
} : NewsCardCardProps) {
	return (
		<div onClick={onClick} className="relative rounded-2xl border-2 border-gray-900/75 bg-gray-800 p-0 tiny:p-2 xxxs:p-3 xxs:p-4 xs:p-5 sm:p-8 lg:p-10 shadow-md h-full min-h-16 max-h-32 tiny:max-h-48 xxxs:max-h-64 xxs:min-h-32 xxs:max-h-96 xs:min-h-64 xs:max-h-96 sm:max-h-128">
			<h1 className={`relative w-full h-full z-1 pointer-events-none text-shadow-black text-shadow-sm text-center text-ellipsis font-semibold text-tiny tiny:text-xs xxxs:text-sm xxs:text-lg xs:text-xl sm:text-3xl lg:text-4xl ${montserrat.className}`}>{title}</h1>
			<div className="absolute inset-0 p-0 xxs:p-1 xs:p-2 flex justify-center items-center overflow-hidden">
				<Image className="rounded-2xl w-full transition-all duration-500 hover:scale-150 h-full blur-[1px] object-cover brightness-75" src={image} alt="" width={512} height={512} />
			</div>
		</div>
	)
}