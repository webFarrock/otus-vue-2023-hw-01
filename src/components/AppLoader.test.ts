/**
 * @vitest-environment jsdom
 */

import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import AppLoader from '@/components/AppLoader.vue'
import { DEFAULT_APP_LOADING_MESSAGE } from '@/constants/hint'

let wrapper: VueWrapper | null = null

describe('AppLoader', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders by default', () => {
    wrapper = mount(AppLoader)
    expect(wrapper.isVisible()).toBeTruthy()
    expect((wrapper as VueWrapper).find('[data-testid="app-loader"]').text()).toContain(DEFAULT_APP_LOADING_MESSAGE)
  })
})

