const API_BASE_URL = 'http://localhost:4000'

interface ApiError {
  message: string
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const handleError = (error: unknown): never => {
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    console.error(
      'Network Error: Unable to connect to the server. Please check if the server is running.',
    )
    throw new Error(
      'Unable to connect to the server. Please check if the server is running.',
    )
  }
  console.error('API Error:', error)
  throw error
}

const handleResponseError = async (response: Response, endpoint: string) => {
  if (response.status === 404) {
    throw new Error(`Endpoint not found: ${endpoint}`)
  }
  const error: ApiError = await response.json()
  throw new Error(error.message || 'Request failed')
}

export const api = {
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        return handleResponseError(response, endpoint)
      }

      return response.json()
    } catch (error) {
      return handleError(error)
    }
  },

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: defaultHeaders,
      })

      if (!response.ok) {
        return handleResponseError(response, endpoint)
      }

      return response.json()
    } catch (error) {
      return handleError(error)
    }
  },

  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        return handleResponseError(response, endpoint)
      }

      return response.json()
    } catch (error) {
      return handleError(error)
    }
  },

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: defaultHeaders,
      })

      if (!response.ok) {
        return handleResponseError(response, endpoint)
      }

      return response.json()
    } catch (error) {
      return handleError(error)
    }
  },
}
