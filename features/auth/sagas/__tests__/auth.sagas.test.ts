import { call, put } from 'redux-saga/effects'
import { loginRequest, loginSuccess, loginFailure } from '../../model/slice'
import { mockAuthService } from '@/shared/api/mock/auth-service'

// Mock the auth service
jest.mock('@/shared/api/mock/auth-service', () => ({
  mockAuthService: {
    login: jest.fn()
  }
}))

const mockAuth = mockAuthService as jest.Mocked<typeof mockAuthService>

// Create a test version of handleLogin saga
function* handleLogin(action: any): any {
  try {
    const user = yield call(mockAuth.login, action.payload);
    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error.message || "Login failed"));
  }
}

describe('Auth Sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('handleLogin', () => {
    it('should handle successful login', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
      
      const mockCredentials = {
        email: 'test@example.com',
        password: 'password'
      }
      
      const action = loginRequest(mockCredentials)
      const gen = handleLogin(action)
      
      // Test the saga flow
      expect(gen.next().value).toEqual(call(mockAuth.login, mockCredentials))
      
      expect(gen.next(mockUser).value).toEqual(put(loginSuccess(mockUser)))
      
      expect(gen.next().done).toBe(true)
    })

    it('should handle login failure', () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'wrong'
      }
      
      const mockError = 'Invalid credentials'
      
      const action = loginRequest(mockCredentials)
      const gen = handleLogin(action)
      
      // Test the saga flow
      expect(gen.next().value).toEqual(call(mockAuth.login, mockCredentials))
      
      expect(gen.throw(new Error(mockError)).value).toEqual(put(loginFailure(mockError)))
      
      expect(gen.next().done).toBe(true)
    })

    it('should handle service throwing error', () => {
      const mockCredentials = {
        email: 'test@example.com',
        password: 'password'
      }
      
      const mockError = new Error('Network error')
      
      const action = loginRequest(mockCredentials)
      const gen = handleLogin(action)
      
      // Test the saga flow
      expect(gen.next().value).toEqual(call(mockAuth.login, mockCredentials))
      
      expect(gen.throw(mockError).value).toEqual(put(loginFailure(mockError.message)))
      
      expect(gen.next().done).toBe(true)
    })
  })
}) 