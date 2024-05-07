export type AuthMessage = {
  message: string;
  type: 'success' | 'error' | 'warning' | string | undefined;
  setMessage?: (message: AuthMessage | null) => void;
  code?: number;
}

export type UpdateUserMessage = {
  message: string;
  type: 'success' | 'error' | 'warning' | string | undefined;
  setMessage?: (message: UpdateUserMessage | null) => void;
  code?: number;
}