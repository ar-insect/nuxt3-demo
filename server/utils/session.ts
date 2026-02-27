import { H3Event } from 'h3'
import { randomUUID } from 'crypto'

export const getSessionId = (event: H3Event): string => {
  let sessionId = getCookie(event, 'session_id')
  
  if (!sessionId) {
    sessionId = randomUUID()
    setCookie(event, 'session_id', sessionId, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }
  
  return sessionId
}
