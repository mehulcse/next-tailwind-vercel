import Head from 'next/head'
import {useQuery} from "react-query";
import {fetchUsers} from "@/services/getUsers";
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useMemo} from "react";

export default function Home() {
	const router = useRouter()
	const {data: users} = useQuery('get-users', fetchUsers);

	const user = useMemo(() => {
		return users?.find((user: any) => user.id === Number(router.query.slug));
	}, [router.query.slug, users])

	return (
		<>
			<Head>
				<meta name="description" content={`User Details ${user?.name}`}/>
			</Head>

			<div
				className="w-96 p-4 m-4 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<div className="flex self-center justify-center flex-col items-center pb-10">
					<Image
						src={user.image}
						width={200}
						height={200}
						alt={user.name}
						className="w-24 h-24 mb-3 rounded-full shadow-lg"
					/>
					<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
					<span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>
					<span className="text-sm text-gray-500 dark:text-gray-400">{user?.age}</span>
					<span className="text-sm text-gray-500 dark:text-gray-400">{user?.city}</span>
				</div>
			</div>
		</>
	)
}
