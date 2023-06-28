/**
 * @vitest-environment jsdom
 */

import { mount, VueWrapper } from '@vue/test-utils'
import { describe, vi, it, expect, afterEach } from 'vitest'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { DEFAULT_APP_ERROR_MESSAGE } from '@/constants/hint'

let wrapper: VueWrapper | null = null

describe('ErrorMessage', () => {
  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders by default', () => {
    wrapper = mount(ErrorMessage)
    expect((wrapper as VueWrapper).find('[data-testid="error-message"]').text()).toContain(DEFAULT_APP_ERROR_MESSAGE)
  })
  
  it('renders with slot', () => {
    const defaultSlotContent = '<b>some custom message</b>'
    wrapper = mount(ErrorMessage, {
      slots: {
        default: defaultSlotContent
      }
    })
    expect((wrapper as VueWrapper).find('[data-testid="error-message"]').html()).toContain(defaultSlotContent)
  })
})

