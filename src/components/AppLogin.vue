<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useUser } from '@/store/user'
import { routeHome, TEST_PASSWORD, TEST_USER } from '@/constants'

const { login } = useUser()
const router = useRouter()
const getClearFormData = () => ({
  login: '',
  password: '',
})
const formData = ref(getClearFormData())
const rules = {
  login: { required },
  password: { required },
}
const v$ = useVuelidate(rules, formData)

const loginClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.login.$error,
  'is-invalid': v$.value.$dirty && v$.value.login.$error,
}))

const passwordClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.password.$error,
  'is-invalid': v$.value.$dirty && v$.value.password.$error,
}))

const btnClassNamae = computed(() => ({ disabled: v$.value.$dirty && v$.value.$error }))

const clearForm = () => (formData.value = getClearFormData())
const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  if (login(formData.value.login, formData.value.password)) {
    alert('Auth correct')
    router.push(routeHome)
    return
  }

  alert('Login or password is not match')
}
</script>

<template>
  <div class="py-5 text-center">
    <h2>Login form</h2>
  </div>
  <div class="row">
    <div class="col-12 pb-4">
      Test user account <br/>
      login: {{ TEST_USER }} <br/>
      password: {{ TEST_PASSWORD }} <br/>
    </div>
  </div>
  <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-12">
        <label class="form-label" for="login">Login</label>
        <input
            id="login"
            v-model="formData.login"
            :class="loginClassName"
            class="form-control"
            type="email"
        />
        <div class="invalid-feedback">
          <div v-for="error of v$.login.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
      </div>
      <div class="col-12">
        <label class="form-label" for="password">Password</label>
        <input
            id="password"
            v-model="formData.password"
            :class="passwordClassName"
            class="form-control"
            type="text"
        />
        <div class="invalid-feedback">
          <div v-for="error of v$.password.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <hr class="my-4"/>

    <button :class="btnClassNamae" class="w-100 btn btn-primary btn-lg" type="submit">Login</button>
  </form>
</template>

<style scoped type="scss"></style>
