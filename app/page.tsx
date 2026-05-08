import WoodenFish from '@/components/WoodenFish'
import Leaderboard from '@/components/Leaderboard'
import FarcasterLogin from '@/components/FarcasterLogin'
export default function Home() {
  return (
    <main className="
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      items-center
      p-8
    ">

      <div className="flex flex-col items-center gap-12">

        <div className="mt-10 text-center">
          <h1 className="text-6xl font-bold">
            电子木鱼
          </h1>

          <p className="text-zinc-400 mt-4">
            敲电子木鱼，积赛博功德
          </p>
        </div>
      <FarcasterLogin />

        <WoodenFish />

        <Leaderboard />

      </div>

    </main>
  )
}
