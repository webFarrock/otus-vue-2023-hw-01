<script setup lang="ts">
import {computed} from "vue";

interface IProps{
  rating: number
}

const props = defineProps<IProps>()
const ratingRound = computed(() => Math.round(props.rating))
const stars = computed(() => new Array(5).fill({}).map((item, idx) => ({
  fa: true,
  'fa-star': true,
  'rating-color': ratingRound.value >= idx+1,
}))
)
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="review-stat">Rating {{rating}}</div>
    <div class="small-ratings">
      <i v-for="star in stars"
         :class="star"
         :key="star"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.ratings{
  margin-right:10px;
}

.ratings i{
  color:#cecece;
  font-size:32px;
}

.rating-color{
  color:#fbc634 !important;
}

.review-count{
  font-weight:400;
  margin-bottom:2px;
  font-size:24px !important;
}

.small-ratings i{
  color:#cecece;
}

.review-stat{
  font-weight:300;
  font-size:18px;
  margin-bottom:2px;
}
</style>
