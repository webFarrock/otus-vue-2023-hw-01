/**
 * @vitest-environment jsdom
 */

import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'
import AppFooter from '@/components/AppFooter.vue'
import { DEFAULT_APP_FOOTER_TEXT } from '@/constants/hint'

let wrapper: VueWrapper | null = null

describe('AppFooter', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders by default', () => {
    wrapper = mount(AppFooter)
    expect(wrapper.isVisible()).toBeTruthy()
    expect((wrapper as VueWrapper).find('[data-testid="app-footer"]').text()).toContain(DEFAULT_APP_FOOTER_TEXT)
  })

})

