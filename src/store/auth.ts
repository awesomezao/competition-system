import { useState, useCallback } from 'react'
import { createContainer } from "unstated-next"

function useAuth() {
  const [isLogin, setIsLogin] = useState(false)
  return { isLogin, setIsLogin }
}

let Auth=createContainer(useAuth)

export default Auth