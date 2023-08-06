import Link from 'next/link'

import { routes } from '@/routing/router'

const NotFound = () => {
  return (
    <div className="flex h-screen text-lg justify-center items-center flex-col gap-10">
      <h1>Oooooooops...</h1>
      <h2>That page cannot be found</h2>
      <p>
        Go back to the{' '}
        <Link href={routes.users} className="text-accent-500">
          Users
        </Link>
      </p>
    </div>
  )
}

export default NotFound
