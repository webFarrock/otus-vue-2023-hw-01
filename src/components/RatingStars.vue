<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  rating: number
}

const minRating = 0
const maxRating = 5
const props = defineProps<IProps>()
const ratingRound = computed(() => {
  const rating = Math.round(props.rating)
  if (rating < minRating) return minRating
  if (rating > maxRating) return maxRating
  return rating
})
const stars = computed(() =>
    new Array(5).fill({}).map((item, idx) => ({
      status: ratingRound.value >= idx + 1 ? 'filled' : 'empty',
      className: {
        fa: true,
        'fa-star': true,
        'rating-color': ratingRound.value >= idx + 1,
      }
    })),
)
</script>

<template>
  <div v-if="ratingRound" data-testid="rating" class="d-flex justify-content-between align-items-center">
    <div class="review-stat" data-testid="rating-title">Rating {{ rating }}</div>
    <div class="small-ratings">
      <i v-for="star in stars" :data-testid="`rating-star-${star.status}`" :class="star.className" :key="star"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ratings {
  margin-right: 10px;
}

.ratings i {
  color: #cecece;
  font-size: 32px;
}

.rating-color {
  color: #fbc634 !important;
}

.review-count {
  font-weight: 400;
  margin-bottom: 2px;
  font-size: 24px !important;
}

.small-ratings i {
  color: #cecece;
}

.review-stat {
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 2px;
}
</style>
