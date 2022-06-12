type Authenticator = {
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  token: string | null;
  userID: number | null;
  isAuthenticated: boolean;
  signOut: () => void;
  signInWithEmail: (
    email: string,
    password: string,
    callback?: Function
  ) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    callback?: Function
  ) => Promise<void>;
};
