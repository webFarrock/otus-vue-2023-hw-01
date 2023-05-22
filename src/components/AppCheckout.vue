<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { routeHome } from '@/constants'
import useBasket from '@/composables/use-basket'
import BasketAside from '@/components/BasketAside.vue'

const router = useRouter()
const { isEmpty } = useBasket()

onMounted(() => {
  if (isEmpty.value) router.push(routeHome)
})
</script>

<template>
  <div class="py-5 text-center">
    <h2>Checkout form</h2>
  </div>

  <div class="row g-5">
    <BasketAside />
    <div class="col-md-7 col-lg-8">
      <form class="needs-validation" novalidate>
        <div class="row g-3">
          <div class="col-sm-6">
            <label class="form-label" for="firstName">First name</label>
            <input
              id="firstName"
              class="form-control"
              placeholder=""
              required
              type="text"
              value=""
            />
            <div class="invalid-feedback">Valid first name is required.</div>
          </div>

          <div class="col-sm-6">
            <label class="form-label" for="lastName">Last name</label>
            <input
              id="lastName"
              class="form-control"
              placeholder=""
              required
              type="text"
              value=""
            />
            <div class="invalid-feedback">Valid last name is required.</div>
          </div>

          <div class="col-12">
            <label class="form-label" for="email"
              >Email <span class="text-body-secondary">(Optional)</span></label
            >
            <input id="email" class="form-control" placeholder="you@example.com" type="email" />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div class="col-12">
            <label class="form-label" for="address">Address</label>
            <input
              id="address"
              class="form-control"
              placeholder="1234 Main St"
              required
              type="text"
            />
            <div class="invalid-feedback">Please enter your shipping address.</div>
          </div>
        </div>

        <hr class="my-4" />

        <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
      </form>
    </div>
  </div>
</template>
