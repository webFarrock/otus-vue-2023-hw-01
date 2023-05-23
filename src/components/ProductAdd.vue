<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, minLength, url } from '@vuelidate/validators'

const getClearFormData = () => ({
  name: '',
  category: '',
  description: '',
  price: null,
  image: '',
})
const formData = ref(getClearFormData())
const rules = {
  name: { required, minLength: minLength(3) },
  category: { required, minLength: minLength(3) },
  description: { required, minLength: minLength(3) },
  price: { required, minValue: minValue(1) },
  image: { required, url },
}
const v$ = useVuelidate(rules, formData)

const nameClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.name.$error,
  'is-invalid': v$.value.$dirty && v$.value.name.$error,
}))

const categoryClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.category.$error,
  'is-invalid': v$.value.$dirty && v$.value.category.$error,
}))

const descriptionClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.description.$error,
  'is-invalid': v$.value.$dirty && v$.value.description.$error,
}))

const priceClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.price.$error,
  'is-invalid': v$.value.$dirty && v$.value.price.$error,
}))

const imageClassName = computed(() => ({
  'is-valid': v$.value.$dirty && !v$.value.image.$error,
  'is-invalid': v$.value.$dirty && v$.value.image.$error,
}))

const btnClassNamae = computed(() => ({ disabled: v$.value.$dirty && v$.value.$error }))

const clearForm = () => (formData.value = getClearFormData())
const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    console.log('from invalid')
    return
  }

  alert(`Product ${formData.value.name} was added`)
  console.log('form ok, data: ', formData.value)
  clearForm()
  v$.value.$reset()
}
</script>

<template>
  <div class="py-5 text-center">
    <h2>New product form {{ v$.$dirty }}</h2>
  </div>

  <form novalidate @submit.prevent="handleSubmit">
    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="product-name">Product name</label>
        <input
          id="product-name"
          v-model="formData.name"
          :class="nameClassName"
          class="form-control"
          type="text"
        />
        <div class="invalid-feedback">
          <div v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="category-name">Category name</label>
        <input
          id="category-name"
          v-model="formData.category"
          :class="categoryClassName"
          class="form-control"
          type="text"
        />
        <div class="invalid-feedback">
          <div v-for="error of v$.category.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="price">Price</label>
        <div class="input-group has-validation">
          <span class="input-group-text">$</span>
          <input
            id="price"
            v-model="formData.price"
            :class="priceClassName"
            class="form-control"
            type="number"
          />
          <div class="invalid-feedback">
            <div v-for="error of v$.price.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="description">Description</label>
        <input
          id="description"
          v-model="formData.description"
          :class="descriptionClassName"
          class="form-control"
          type="text"
        />
        <div class="invalid-feedback">
          <div v-for="error of v$.description.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <div class="row py-1">
      <div class="col-12">
        <label class="form-label" for="product-image">Image link</label>
        <input
          id="product-image"
          v-model="formData.image"
          :class="imageClassName"
          class="form-control"
          type="text"
        />
        <div class="invalid-feedback">
          <div v-for="error of v$.image.$errors" :key="error.$uid">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <button :class="btnClassNamae" class="w-100 btn btn-primary btn-lg" type="submit">
      Submit
    </button>
  </form>
</template>
