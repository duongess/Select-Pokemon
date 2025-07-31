import { 
  selectUser, 
  selectIsAuthenticated, 
  selectIsLoading, 
  selectError 
} from '../selectors'

describe('Auth Selectors', () => {
  const mockState = {
    auth: {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      },
      isAuthenticated: true,
      isLoading: false,
      error: null
    }
  }

  const mockStateWithError = {
    auth: {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: 'Invalid credentials'
    }
  }

  const mockStateLoading = {
    auth: {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null
    }
  }



  describe('selectUser', () => {
    it('should select the user from auth state', () => {
      const result = selectUser(mockState)
      expect(result).toEqual(mockState.auth.user)
    })

    it('should return null if user does not exist', () => {
      const result = selectUser(mockStateWithError)
      expect(result).toBeNull()
    })

    it('should return null if auth state does not exist', () => {
      const result = selectUser({} as any)
      expect(result).toBeNull()
    })
  })

  describe('selectIsAuthenticated', () => {
    it('should select isAuthenticated from auth state', () => {
      const result = selectIsAuthenticated(mockState)
      expect(result).toBe(true)
    })

    it('should return false if not authenticated', () => {
      const result = selectIsAuthenticated(mockStateWithError)
      expect(result).toBe(false)
    })

    it('should return false if auth state does not exist', () => {
      const result = selectIsAuthenticated({} as any)
      expect(result).toBe(false)
    })
  })

  describe('selectIsLoading', () => {
    it('should select isLoading from auth state', () => {
      const result = selectIsLoading(mockState)
      expect(result).toBe(false)
    })

    it('should return true if loading', () => {
      const result = selectIsLoading(mockStateLoading)
      expect(result).toBe(true)
    })

    it('should return false if auth state does not exist', () => {
      const result = selectIsLoading({} as any)
      expect(result).toBe(false)
    })
  })

  describe('selectError', () => {
    it('should select error from auth state', () => {
      const result = selectError(mockState)
      expect(result).toBe(null)
    })

    it('should return error message if error exists', () => {
      const result = selectError(mockStateWithError)
      expect(result).toBe('Invalid credentials')
    })

    it('should return null if auth state does not exist', () => {
      const result = selectError({} as any)
      expect(result).toBeNull()
    })
  })

  describe('Selector memoization', () => {
    it('should return the same reference for identical state', () => {
      const result1 = selectUser(mockState)
      const result2 = selectUser(mockState)
      expect(result1).toBe(result2)
    })

    it('should return different reference for different state', () => {
      const result1 = selectUser(mockState)
      const result2 = selectUser(mockStateWithError)
      expect(result1).not.toBe(result2)
    })
  })

  describe('Edge cases', () => {
    it('should handle null state', () => {
      expect(selectUser(null as any)).toBeNull()
      expect(selectIsAuthenticated(null as any)).toBe(false)
      expect(selectIsLoading(null as any)).toBe(false)
      expect(selectError(null as any)).toBeNull()
    })

    it('should handle undefined state', () => {
      expect(selectUser(undefined as any)).toBeNull()
      expect(selectIsAuthenticated(undefined as any)).toBe(false)
      expect(selectIsLoading(undefined as any)).toBe(false)
      expect(selectError(undefined as any)).toBeNull()
    })

    it('should handle partial auth state', () => {
      const partialState = {
        auth: {
          user: null,
          isLoading: false,
          error: null,
          isAuthenticated: false
        }
      }
      
      expect(selectUser(partialState)).toBeNull()
      expect(selectIsAuthenticated(partialState)).toBe(false)
      expect(selectIsLoading(partialState)).toBe(false)
      expect(selectError(partialState)).toBeNull()
    })
  })
}) 