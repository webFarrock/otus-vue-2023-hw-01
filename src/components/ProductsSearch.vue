<script lang="ts" setup>
import {ref} from 'vue'
import {watchDebounced} from '@vueuse/core'
import type {ISearchData} from "@/types";

const emit = defineEmits<{
  search: [ISearchData]
}>()
const name = ref<(ISearchData)['name']>('')
const priceFrom = ref<ISearchData['priceFrom']>(null)
const priceTo = ref<ISearchData['priceTo']>(null)

watchDebounced(
    [name, priceFrom, priceTo],
    () => emit('search', {
      name: name.value,
      priceFrom: priceFrom.value,
      priceTo: priceTo.value,
    }),
    {debounce: 500, maxWait: 1000}
)
</script>

<template>
  <div class="album my-5 bg-body-tertiary">
    <div class="container">
      <div class="input-group mb-3">
        <span id="basic-addon1" class="input-group-text">Product name</span>
        <input v-model="name" class="form-control" type="text">
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">Price from </span>
        <input v-model.number="priceFrom" class="form-control" type="number">
        <span class="input-group-text">Price to </span>
        <input v-model.number="priceTo" class="form-control" type="number">
      </div>
    </div>
  </div>
</template>
