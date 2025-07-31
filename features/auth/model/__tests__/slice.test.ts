import authReducer, { 
  loginRequest, 
  loginSuccess, 
  loginFailure, 
  logout
} from '../slice'

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

describe('Auth Slice', () => {
  it('should return initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' })
    expect(state).toEqual(initialState)
  })

  it('should handle loginRequest', () => {
    const state = authReducer(initialState, loginRequest({ 
      email: 'test@example.com', 
      password: 'password' 
    }))
    
    expect(state.isLoading).toBe(true)
    expect(state.error).toBe(null)
    expect(state.isAuthenticated).toBe(false)
  })

  it('should handle loginSuccess', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    }
    
    const state = authReducer(
      { ...initialState, isLoading: true },
      loginSuccess(mockUser)
    )
    
    expect(state.isLoading).toBe(false)
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle loginFailure', () => {
    const errorMessage = 'Invalid credentials'
    
    const state = authReducer(
      { ...initialState, isLoading: true },
      loginFailure(errorMessage)
    )
    
    expect(state.isLoading).toBe(false)
    expect(state.error).toBe(errorMessage)
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBe(null)
  })

  it('should handle logout', () => {
    const stateWithUser = {
      ...initialState,
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      isAuthenticated: true
    }
    
    const state = authReducer(stateWithUser, logout())
    
    expect(state.isLoading).toBe(false)
    expect(state.user).toBe(null)
    expect(state.isAuthenticated).toBe(false)
    expect(state.error).toBe(null)
  })

  it('should maintain state for unknown actions', () => {
    const currentState = {
      ...initialState,
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      isAuthenticated: true
    }
    
    const state = authReducer(currentState, { type: 'unknown' })
    expect(state).toEqual(currentState)
  })

  it('should handle multiple state transitions correctly', () => {
    let state = authReducer(initialState, loginRequest({ 
      email: 'test@example.com', 
      password: 'password' 
    }))
    expect(state.isLoading).toBe(true)
    
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' }
    state = authReducer(state, loginSuccess(mockUser))
    expect(state.isLoading).toBe(false)
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
    
    state = authReducer(state, logout())
    expect(state.user).toBe(null)
    expect(state.isAuthenticated).toBe(false)
  })

  it('should handle error state correctly', () => {
    let state = authReducer(initialState, loginRequest({ 
      email: 'test@example.com', 
      password: 'wrong' 
    }))
    
    state = authReducer(state, loginFailure('Invalid credentials'))
    expect(state.error).toBe('Invalid credentials')
    expect(state.isLoading).toBe(false)
    expect(state.isAuthenticated).toBe(false)
    
    // Error should be cleared on new login attempt
    state = authReducer(state, loginRequest({ 
      email: 'test@example.com', 
      password: 'password' 
    }))
    expect(state.error).toBe(null)
    expect(state.isLoading).toBe(true)
  })
}) 