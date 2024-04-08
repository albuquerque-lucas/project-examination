export type AuthMessage = {
  message: string;
  type: 'success' | 'error' | 'warning' | string;
}