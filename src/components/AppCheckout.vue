<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routeHome } from '@/constants'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

import useBasket from '@/composables/use-basket'
import BasketList from '@/components/BasketList.vue'

const router = useRouter()
const { isEmpty, clearBasket } = useBasket()

const getClearFormData = () => ({
  firstName: '',
  lastName: '',
  email: '',
  address: null,
})
const formData = ref(getClearFormData())
const rules = {
  firstName: { required, minLength: minLength(3) },
  email: { required, email },
  address: { required, minLength: minLength(3) },
}
const v$ = useVuelidate(rules, formData)

const firstNameClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.firstName.$error,
  'is-invalid': v$.value.$dirty && v$.value.firstName.$error,
}))

const emailClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.email.$error,
  'is-invalid': v$.value.$dirty && v$.value.email.$error,
}))

const addressClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.address.$error,
  'is-invalid': v$.value.$dirty && v$.value.address.$error,
}))
const btnClassNamae = computed(() => ({ disabled: v$.value.$dirty && v$.value.$error }))

const clearForm = () => (formData.value = getClearFormData())
const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    console.log('from invalid')
    return
  }

  alert(`${formData.value.firstName}, Your order was submitted`)
  console.log('form ok, data: ', formData.value)
  clearForm()
  clearBasket()
  v$.value.$reset()
  router.push(routeHome)
}

onMounted(() => {
  if (isEmpty.value) router.push(routeHome)
})
</script>

<template>
  <div class="py-5 text-center">
    <h2>Checkout form</h2>
  </div>

  <div class="row g-5">
    <BasketList class="col-md-5 col-lg-4" />
    <div class="col-md-7 col-lg-8">
      <form class="needs-validation" novalidate @submit.prevent="handleSubmit">
        <div class="row g-3">
          <div class="col-sm-6">
            <label class="form-label" for="firstName">First name</label>
            <input
              id="firstName"
              v-model="formData.firstName"
              :class="firstNameClassName"
              class="form-control"
              type="text"
            />
            <div class="invalid-feedback">
              <div v-for="error of v$.firstName.$errors" :key="error.$uid">
                {{ error.$message }}
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <label class="form-label" for="lastName">Last name</label>
            <input id="lastName" v-model="formData.lastName" class="form-control" type="text" />
          </div>

          <div class="col-12">
            <label class="form-label" for="email">Email</label>
            <input
              id="email"
              v-model="formData.email"
              :class="emailClassName"
              class="form-control"
              type="email"
            />
            <div class="invalid-feedback">
              <div v-for="error of v$.email.$errors" :key="error.$uid">{{ error.$message }}</div>
            </div>
          </div>

          <div class="col-12">
            <label class="form-label" for="address">Address</label>
            <input
              id="address"
              v-model="formData.address"
              :class="addressClassName"
              class="form-control"
              type="text"
            />
            <div class="invalid-feedback">
              <div v-for="error of v$.address.$errors" :key="error.$uid">{{ error.$message }}</div>
            </div>
          </div>
        </div>

        <hr class="my-4" />

        <button :class="btnClassNamae" class="w-100 btn btn-primary btn-lg" type="submit">
          Continue to checkout
        </button>
      </form>
    </div>
  </div>
</template>
