import { computed } from 'vue'
import { useState } from 'vue3-usestate'
import { TEST_USER, TEST_PASSWORD } from '@/constants'
import type { IUser } from '@/types'
import useBasket from '@/composables/use-basket'

export default () => {
  const user = useState<IUser | null>('user', null)
  const { clearBasket } = useBasket()

  const isLoggedIn = computed(() => user.value?.login === TEST_USER)
  const checkPass = (userLogin: string, userPass: string): boolean => {
    if (userLogin === TEST_USER && userPass === TEST_PASSWORD) return true
    return false
  }
  const login = (userLogin: string, userPass: string) => {
    if (checkPass(userLogin, userPass)) {
      user.value = { login: userLogin }
      return true
    }

    return false
  }
  const logout = () => {
    user.value = null
    clearBasket()
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
}
