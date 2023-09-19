import { PrismaClient } from '@prisma/client'

export async function getData() {

  const prisma = new PrismaClient()

  const data = await prisma.casts.findMany({
    where: {
      parent_url: "chain://eip155:1/erc721:0x37fb80ef28008704288087831464058a4a3940ae"
    },
    orderBy: {
      timestamp: 'desc'
    },
    take: 10
  })

  return data
}


export default async function Home() {

  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-4xl font-bold text-center py-10">
        Welcome to f/evm
      </h1>
      <ul className="flex flex-col items-center">
        {data && data.map((item) => (
          <li className="my-2 mx-6 break-all text-ellipsis border border-gray-200 rounded-md px-4 py-3 sm:max-w-screen-sm sm:w-full">
            <p className="text-sm text-gray-800 mb-4">{item.text}</p>
            <p className="text-xs text-gray-600 font-light">by user {item.fid.toString()}</p>
          </li>
        ))}
      </ul>
    </main >
  )
}
