import { describe, it, expect } from 'vitest'
import type { RootState } from '@/app/store.ts'
import {
  selectTotalPages,
  selectPaginationInfo,
  selectSearchTerm,
} from './productsSelectors.ts'

function createMockState(overrides: Partial<RootState['products']> = {}): RootState {
  return {
    products: {
      items: [],
      loading: false,
      error: null,
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 10,
      total: 0,
      ...overrides,
    },
  } as RootState
}

describe('productsSelectors', () => {
  describe('selectTotalPages', () => {
    it('returns 1 when total is 0', () => {
      const state = createMockState({ total: 0, itemsPerPage: 10 })
      expect(selectTotalPages(state)).toBe(1)
    })

    it('returns correct pages for paginated data', () => {
      const state = createMockState({ total: 100, itemsPerPage: 10 })
      expect(selectTotalPages(state)).toBe(10)
    })

    it('rounds up when total does not divide evenly', () => {
      const state = createMockState({ total: 25, itemsPerPage: 10 })
      expect(selectTotalPages(state)).toBe(3)
    })
  })

  describe('selectPaginationInfo', () => {
    it('returns pagination info with computed totalPages', () => {
      const state = createMockState({
        currentPage: 2,
        itemsPerPage: 5,
        total: 23,
      })
      const info = selectPaginationInfo(state)
      expect(info).toEqual({
        currentPage: 2,
        itemsPerPage: 5,
        total: 23,
        totalPages: 5,
      })
    })
  })

  describe('selectSearchTerm', () => {
    it('returns search term from state', () => {
      const state = createMockState({ searchTerm: 'phone' })
      expect(selectSearchTerm(state)).toBe('phone')
    })
  })
})
