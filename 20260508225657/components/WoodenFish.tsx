'use client'
import { useUser } from '@/context/UserContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function WoodenFish() {
  const [count, setCount] = useState(0)
  const { user } = useUser()

  const [effects, setEffects] = useState<number[]>([])

  const knock = async () => {
    const id = Date.now()

    setEffects((prev) => [...prev, id])

    setTimeout(() => {
      setEffects((prev) => prev.filter((v) => v !== id))
    }, 1000)

    const audio = new Audio('/knock.mp3')

    audio.volume = 0.5

    audio.play().catch(() => {})
    setCount((v) => v + 1)

    if (!user) return

const { data } = await supabase
  .from('users')
  .select('id')
  .eq('fid', user.fid)
  .single()

if (!data) return

await supabase.rpc('increment_score', {
  row_id: data.id
})
  }

  return (
    <div className="flex flex-col items-center gap-8 relative">

      <div className="relative">

        <motion.div
          whileTap={{
            scale: 0.9,
            rotate: -5
          }}
          transition={{
            type: 'spring',
            stiffness: 300
          }}
          onClick={knock}
          className="
            w-64
            h-64
            rounded-full
            bg-amber-700
            shadow-2xl
            cursor-pointer
            flex
            items-center
            justify-center
            text-7xl
            select-none
          "
        >
          🪵
        </motion.div>

        <AnimatePresence>
          {effects.map((id) => (
            <motion.div
              key={id}
              initial={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              animate={{
                opacity: 0,
                y: -120,
                scale: 1.5
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 1
              }}
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                text-3xl
                font-bold
                text-yellow-300
                pointer-events-none
              "
            >
              +1 功德
            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      <div className="text-5xl font-bold">
        功德：{count}
      </div>

    </div>
  )
}
