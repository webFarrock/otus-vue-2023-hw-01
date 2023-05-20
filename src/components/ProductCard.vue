<script lang="ts" setup>
import {computed} from "vue";
import useBasket from "@/composables/use-basket";
import RatingStars from "@/components/RatingStars.vue";
import type {IProduct} from "@/types";

interface IProps {
  product: IProduct
}

const props = defineProps<IProps>()

const {getBasketQuantity, addToBasket, removeFromBasket} = useBasket()
const basketQuantity = computed(() => getBasketQuantity(props.product))
const handleAddToBasket = () => addToBasket(props.product)
const handleRemoveFromBasket = () => removeFromBasket(props.product)
const handleRemoveFromBasketFull = () => removeFromBasket(props.product, true)
</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <div class="card__image">
        <img :alt="product.title"
             :src="product.image"
             :title="product.title"
             class="card-img-top"
        />
      </div>
      <div class="card__body">
        <div class="card__text">
          <div class="card-text__title" v-html="product.title"/>
          <div class="card-text__category">{{ product.category }}</div>
        </div>
        <RatingStars :rating="product.rating.rate"></RatingStars>
        <div class="card__price">
          {{ product.price }} $
        </div>
        <div class="mt-2 w-100 card-basket">
          <template v-if="basketQuantity">
            <div class="d-flex justify-content-between">
              <div class="d-flex w-25 gap-2">
                <button class="btn btn-outline-primary"
                        type="button"
                        @click="handleRemoveFromBasket"
                >-
                </button>
                <input :value="basketQuantity" class="card__basket-counter" disabled type="number"/>
                <button class="btn btn-outline-primary" type="button" @click="handleAddToBasket">+</button>
              </div>
              <button class="btn btn-outline-primary " type="button" @click="handleRemoveFromBasketFull">Remove</button>
            </div>
          </template>
          <template v-else>
            <button class="btn btn-outline-primary"
                    type="button"
                    @click="handleAddToBasket"
            >Add to basket
            </button>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 100%;

  &__basket-counter {
    width: 50px;
    text-align: center;
    padding: 0;
  }

  &__body {
    flex: 1 1 auto;
    padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
    color: var(--bs-card-color);
  }

  &__text {
    margin-bottom: 10px;

    &__title {
      font-weight: bold;
    }
  }

  &__image {
    width: 300px;
    height: 300px;
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      max-width: 90%;
      max-height: 90%;
    }
  }

  &__price {
    font-size: 24px;
  }
}


</style>
