'use client'

import {
  createContext,
  useContext,
  useState
} from 'react'

type UserType = {
  fid: number
  username: string
}

type ContextType = {
  user: UserType | null
  setUser: (user: UserType | null) => void
}

const UserContext = createContext<ContextType>({
  user: null,
  setUser: () => {}
})

export function UserProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserType | null>(null)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
