export * from './aliases';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
