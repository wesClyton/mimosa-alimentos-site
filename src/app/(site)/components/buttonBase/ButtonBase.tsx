import Link from "next/link";

interface ButtonBaseProps {
	title: string;
	href: string;
	color?: string;
	bg?: string;
}

export function ButtonBase({title, href, color = "text-yellow-500", bg = "bg-red-500" }: ButtonBaseProps) {
	return (
		<Link href={href} className={`px-6 text-base w-fit py-3 rounded-sm font-bold mt-10 ${color} ${bg}`}>{title}</Link>
	)
}