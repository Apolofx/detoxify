type Authenticator = {
  isLoading: boolean;
  error: boolean;
  token: string | null;
  isAuthenticated: boolean;
  signOut: () => void;
  signInWithEmail: (
    email: string,
    password: string,
    callback?: Function
  ) => Promise<void>;
  signUpWithEmail: () => void;
};
