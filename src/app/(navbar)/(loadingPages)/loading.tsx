export default function PageLoading() {
	return (
		<div className="fixed inset-0 flex justify-center items-center w-full h-full">
			<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-200"></div>
		</div>
	)
}