import { useRouter, useSegments } from "expo-router";
import { User, UserProfile } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";

// This hook will protect the route access based on user authentication.
export function useProtectedRoute(user:any) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}
