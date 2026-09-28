import { render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { WinCelebration } from './WinCelebration'

function mockMatchMedia(reduce: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: reduce && query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}

function mockImagePreload() {
  class FakeImage {
    onload: ((ev?: unknown) => void) | null = null
    onerror: ((ev?: unknown) => void) | null = null
    set src(_v: string) {
      queueMicrotask(() => this.onload?.(undefined))
    }
  }
  vi.stubGlobal('Image', FakeImage)
}

describe('WinCelebration', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('zeigt animiertes GIF wenn Motion erlaubt ist', async () => {
    mockMatchMedia(false)
    mockImagePreload()

    render(<WinCelebration outcome="won" />)

    await waitFor(() => {
      expect(screen.getByTestId('dog-animated')).toBeInTheDocument()
    })
    expect(screen.getByRole('status')).toHaveAttribute('data-wagging', 'true')
    expect(screen.getByTestId('dog-animated')).toHaveAttribute(
      'src',
      expect.stringContaining('wag-animated.gif'),
    )
  })

  it('bleibt statisch bei prefers-reduced-motion', async () => {
    mockMatchMedia(true)
    mockImagePreload()

    render(<WinCelebration outcome="won" />)

    await waitFor(() => {
      expect(screen.getByTestId('dog-static')).toBeInTheDocument()
    })
    expect(screen.getByRole('status')).toHaveAttribute('data-wagging', 'false')
  })

  it('forceMotion wedelt auch bei reduced-motion', async () => {
    mockMatchMedia(true)
    mockImagePreload()

    render(<WinCelebration outcome="won" forceMotion />)

    await waitFor(() => {
      expect(screen.getByTestId('dog-animated')).toBeInTheDocument()
    })
    expect(screen.getByRole('status')).toHaveAttribute('data-wagging', 'true')
  })
})
