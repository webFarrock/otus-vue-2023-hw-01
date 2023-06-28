/**
 * @vitest-environment jsdom
 */

import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import RatingStars from '@/components/RatingStars.vue'

let wrapper: VueWrapper | null = null

describe('RatingStars', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('doesent renders without propRating ', () => {
    wrapper = mount(RatingStars)
    expect(wrapper.isVisible()).toBeFalsy()
  });


  [ 1, 2, 3, 4, 5, 1.2, 2.4 ].forEach((rating) => {
    it(`renders with correct prop rating ${rating}`, () => {
      const maxStars = 5
      const ratingRounded = Math.round(rating)
      wrapper = mount(RatingStars, {
        props: { rating }
      })
      expect(wrapper.isVisible()).toBeTruthy()

      const title = (wrapper as VueWrapper).find('[data-testid="rating-title"]')
      expect(title.isVisible()).toBeTruthy()
      expect(title.text()).toContain(`Rating ${rating}`)

      const starsFilled = (wrapper as VueWrapper).findAll('[data-testid="rating-star-filled"]')
      const starsEmpty = (wrapper as VueWrapper).findAll('[data-testid="rating-star-empty"]')
      const starsTotal = starsFilled.length + starsEmpty.length
      expect(starsFilled.length).toEqual(ratingRounded)
      expect(starsEmpty.length).toEqual(maxStars - ratingRounded)
      expect(starsTotal).toEqual(maxStars)
    })
  });

  [ -1, -2, -3, ].forEach((rating) => {
    it(`renders with negative rating ${rating}`, () => {
      wrapper = mount(RatingStars, {
        props: { rating }
      })
      expect(wrapper.isVisible()).toBeFalsy()
    })
  });

  [ 6, 57, 12331, ].forEach((rating) => {
    it(`renders with more than allowed stars ${rating}`, () => {
      const maxStars = 5
      wrapper = mount(RatingStars, {
        props: { rating }
      })
      expect(wrapper.isVisible()).toBeTruthy()

      const title = (wrapper as VueWrapper).find('[data-testid="rating-title"]')
      expect(title.isVisible()).toBeTruthy()

      const starsFilled = (wrapper as VueWrapper).findAll('[data-testid="rating-star-filled"]')
      const starsEmpty = (wrapper as VueWrapper).findAll('[data-testid="rating-star-empty"]')
      const starsTotal = starsFilled.length + starsEmpty.length
      expect(starsFilled.length).toEqual(maxStars)
      expect(starsEmpty.length).toEqual(0)
      expect(starsTotal).toEqual(maxStars)
    })
  })


})

