export type AuthMessage = {
  message: string;
  type: 'success' | 'error' | 'warning' | string;
  setMessage?: (message: AuthMessage | null) => void;
}