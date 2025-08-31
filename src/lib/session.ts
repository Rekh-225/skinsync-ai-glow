// Session management for anonymous users
export const getOrCreateSessionId = (): string => {
  const key = 'skinSyncSessionId';
  let sessionId = localStorage.getItem(key);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(key, sessionId);
  }
  
  return sessionId;
};

export const clearSessionId = (): void => {
  localStorage.removeItem('skinSyncSessionId');
};