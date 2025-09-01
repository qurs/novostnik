import { Button } from "../ui/button";

export default function EditorForm({
	onConfirm,
	onDecline,
} : {
	onConfirm?: () => void,
	onDecline?: () => void,
}) {
	return (
		<div className="flex justify-between gap-2 p-2 xxxs:gap-3 xxxs:p-3 xxs:p-5 xxs:gap-5">
			<Button variant={'outline'} className="min-w-16 xxs:min-w-28 xs:min-w-36 sm:min-w-50" onClick={onConfirm}>Save</Button>
			<Button variant={'destructive'} className="min-w-10 xxs:min-w-16 xs:min-w-20 sm:min-w-28" onClick={onDecline}>Cancel</Button>
		</div>
	)
}