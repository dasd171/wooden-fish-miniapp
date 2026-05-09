'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type User = {
  id: number
  username: string
  score: number
}

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchLeaderboard()

    const interval = setInterval(() => {
      fetchLeaderboard()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  async function fetchLeaderboard() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('score', {
        ascending: false
      })

    if (error) {
      console.log(error)
      return
    }

    if (data) {
      setUsers(data)
    }
  }

  return (
    <div className="w-full max-w-md">

      <h2 className="text-3xl font-bold mb-6">
        功德排行榜
      </h2>

      <div className="space-y-3">

        {users.map((user, index) => (
          <div
            key={user.id}
            className="
              bg-zinc-900
              rounded-xl
              p-4
              flex
              items-center
              justify-between
              border
              border-zinc-800
            "
          >
            <div className="flex items-center gap-3">

              <div className="
                w-8
                h-8
                rounded-full
                bg-yellow-500
                text-black
                flex
                items-center
                justify-center
                font-bold
              ">
                {index + 1}
              </div>

              <div className="font-semibold">
                {user.username}
              </div>

            </div>

            <div className="font-bold text-yellow-400 text-xl">
              {user.score}
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}
