import { UserButton } from '@clerk/nextjs/app-beta'

export default function Home() {
  return (
    <main>
      <UserButton afterSignOutUrl='/' />

    </main>
  )
}
