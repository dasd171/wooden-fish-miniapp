'use client'
import { useUser } from '@/context/UserContext'
import { useEffect } from 'react'

import {
  AuthKitProvider,
  SignInButton,
  useProfile
} from '@farcaster/auth-kit'

import { supabase } from '@/lib/supabase'

const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'localhost:3000',
  siweUri: 'http://localhost:3000/login',
}

function Profile() {
  const { profile } = useProfile()
  const { setUser } = useUser()

  useEffect(() => {
    if (!profile) return
setUser({
  fid: profile.fid!,
  username: profile.username!
})

    createUser()
  }, [profile])

  async function createUser() {
    if (!profile) return

    const { data: existing } = await supabase
      .from('users')
      .select('*')
      .eq('fid', profile.fid)
      .single()

    if (existing) return

    await supabase
      .from('users')
      .insert({
        fid: profile.fid,
        username: profile.username,
        avatar: profile.pfpUrl,
        score: 0
      })
  }

  if (!profile) {
    return <SignInButton />
  }

  return (
    <div className="
      flex
      items-center
      gap-3
      bg-zinc-900
      p-3
      rounded-xl
    ">

      <img
        src={profile.pfpUrl}
        alt="avatar"
        className="w-12 h-12 rounded-full"
      />

      <div>
        <div className="font-bold">
          {profile.displayName}
        </div>

        <div className="text-sm text-zinc-400">
          @{profile.username}
        </div>

        <div className="text-xs text-yellow-400">
          fid: {profile.fid}
        </div>
      </div>

    </div>
  )
}

export default function FarcasterLogin() {
  return (
    <AuthKitProvider config={config}>
      <Profile />
    </AuthKitProvider>
  )
}
