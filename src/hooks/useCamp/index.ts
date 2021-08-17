import React from "react";
import mFirebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "../../firebase";
import { useParams } from "react-router-dom";

type CampParams = {
  campId: string;
};

export type Camp = {
  id: string;
  name: string;
  dateFrom: Date;
  dateUntil: Date;
  canEdit: boolean;
  activities: {
    name: string;
    start: Date;
    end: Date;
  }[];
  pages: {
    name: string;
    path: string;
    defaultPage: string | undefined;
    image: string;
    description: string;
    visible: boolean;
    participants: any[] | undefined;
  }[];
};

export default function useCamp(): [
  Camp | undefined,
  boolean,
  mFirebase.auth.Error | mFirebase.FirebaseError | Error | undefined
] {
  const [user, authLoading, authError] = useAuthState(firebase.auth);
  const [campData, setCampData] = React.useState<Camp | undefined>(undefined);
  const [dbLoading, setDBLoading] = React.useState(false);
  const [dbError, setDBError] = React.useState<
    mFirebase.FirebaseError | Error | undefined
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
          const campData = doc.data();

          if (!campData) {
            setCampData(undefined);
            setDBError(new Error("Not Found"));
          } else {
            setCampData({
              id: campId,
              name: campData.name,
              dateFrom: campData.dateFrom.toDate(),
              dateUntil: campData.dateUntil.toDate(),
              canEdit: campData.editors.indexOf(user.email) >= 0,
              activities: campData.activities.map((a: any) => ({
                name: a.name,
                start: a.start.toDate(),
                end: a.end.toDate(),
              })),
              pages: campData.pages,
            });
          }
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
