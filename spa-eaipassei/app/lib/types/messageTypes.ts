export type AuthMessage = {
  message: string;
  type: 'success' | 'error' | 'warning' | string | undefined;
  setMessage?: (message: AuthMessage | null) => void;
}