import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { TEST_USER, TEST_PASSWORD } from '@/constants'
import type { IUser, Nullable } from '@/types'
import { useBasket } from '@/store/basket'

export const useUser = defineStore('user', () => {
  const user = ref<Nullable<IUser>>(null)
  const { clearBasket } = useBasket()

  const isLoggedIn = computed(() => user.value?.login === TEST_USER)
  const userFio = computed(() => [ user.value?.firstName, user.value?.lastName ].filter(Boolean).join(' '))
  const userHeaderTitle = computed(() => userFio.value ? `${userFio.value} [${user.value?.login}]` : `${user.value?.login}`)
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
  const setUserData = (data: Partial<IUser>) => {
    user.value = { ...user.value, ...data }
  }

  return {
    userHeaderTitle,
    user,
    isLoggedIn,
    login,
    logout,
    setUserData,
  }
})
