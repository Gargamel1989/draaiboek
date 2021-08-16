import React from "react";
import mFirebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "../../firebase";

export default function useUser(): [
  mFirebase.firestore.DocumentData | undefined,
  boolean,
  mFirebase.auth.Error | mFirebase.FirebaseError | Error | undefined
] {
  const [user, authLoading, authError] = useAuthState(firebase.auth);
  const [userData, setUserData] = React.useState<
    mFirebase.firestore.DocumentData | undefined | null
  >(null);
  const [dbLoading, setDBLoading] = React.useState(false);
  const [dbError, setDBError] = React.useState<
    mFirebase.FirebaseError | undefined
  >(undefined);

  React.useEffect(() => {
    if (!user || authLoading || authError) return;

    setDBLoading(true);

    const unsub = firebase.db
      .collection("users")
      .doc(user.uid)
      .onSnapshot(
        (doc) => {
          setUserData(doc.data());
          setDBLoading(false);
        },
        (error) => {
          setDBError(error);
          setDBLoading(false);
        }
      );

    return unsub;
  }, [user, authLoading, authError]);

  if (authError) {
    return [undefined, false, authError];
  }

  if (authLoading || !user) {
    return [undefined, authLoading, authError];
  }

  if (userData === null && !dbLoading && !dbError) {
    return [undefined, true, undefined];
  }

  if (!userData && !dbLoading && !dbError) {
    firebase.auth.signOut();

    return [undefined, true, new Error("No userdata found")];
  }

  return [
    userData ? { uid: user.uid, ...userData } : undefined,
    dbLoading,
    dbError,
  ];
}
