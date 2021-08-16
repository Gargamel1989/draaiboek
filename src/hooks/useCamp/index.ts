import React from "react";
import mFirebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "../../firebase";
import { useParams } from "react-router-dom";

type CampParams = {
  campId: string;
};

export default function useCamp(): [
  mFirebase.firestore.DocumentData | undefined,
  boolean,
  mFirebase.auth.Error | mFirebase.FirebaseError | undefined
] {
  const [user, authLoading, authError] = useAuthState(firebase.auth);
  const [campData, setCampData] = React.useState<
    mFirebase.firestore.DocumentData | undefined
  >(undefined);
  const [dbLoading, setDBLoading] = React.useState(false);
  const [dbError, setDBError] = React.useState<
    mFirebase.FirebaseError | undefined
  >(undefined);

  const { campId } = useParams<CampParams>();

  React.useEffect(() => {
    if (!user || authLoading || authError) return;

    setDBLoading(true);

    const unsub = firebase.db
      .collection("camps")
      .doc(campId)
      .onSnapshot(
        (doc) => {
          setCampData({
            ...doc.data(),
            dateFrom: doc.data()?.dateFrom.toDate(),
            dateUntil: doc.data()?.dateUntil.toDate(),
            canEdit: doc.data()?.editors.indexOf(user.email) >= 0,
          });
          setDBLoading(false);
        },
        (error) => {
          setDBError(error);
          setDBLoading(false);
        }
      );

    return unsub;
  }, [user, authLoading, authError, campId]);

  if (authError) {
    return [undefined, false, authError];
  }

  if (authLoading || !user) {
    return [undefined, authLoading, authError];
  }

  if (!campData && !dbLoading && !dbError) return [undefined, true, undefined];

  return [campData, dbLoading, dbError];
}
