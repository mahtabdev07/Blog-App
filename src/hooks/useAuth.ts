import { gqlRequest } from "@/lib/gqlClient";
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  ME_QUERY,
  SIGNUP_MUTATION,
} from "@/lib/queries/auth";
import { User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  message: string;
}

interface SignupResponse {
  signup: AuthResponse;
}

interface LoginResponse {
  login: AuthResponse;
}

interface LogoutResponse {
  logout: {
    message: string;
  };
}

interface MeResponse {
  me: User;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => gqlRequest<MeResponse>(ME_QUERY),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const signupMutation = useMutation({
    mutationFn: (input: SignupInput) =>
      gqlRequest<SignupResponse>(SIGNUP_MUTATION, { input }),
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], { me: data.signup.user });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) =>
      gqlRequest<LoginResponse>(LOGIN_MUTATION, { input }),
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], { me: data.login.user });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => gqlRequest<LogoutResponse>(LOGOUT_MUTATION),
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });

  const signup = async (input: SignupInput) => {
    return signupMutation.mutateAsync(input);
  };

  const login = async (input: LoginInput) => {
    return loginMutation.mutateAsync(input);
  };

  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  const isAuthenticated = !!user?.me;
  const currentUser = user?.me || null;

  return {
    user: currentUser,
    isAuthenticated,
    isLoadingUser,
    userError,

    signup,
    login,
    logout,

    isSigningUp: signupMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    signupError: signupMutation.error,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,

    signupData: signupMutation.data,
    loginData: loginMutation.data,
    logoutData: logoutMutation.data,
  };
};
