import { extractDocs } from "@/services/utils";
import { type DocumentData, type Query, onSnapshot } from "firebase/firestore";
import { useCallback, useRef, useSyncExternalStore } from "react";
import type { z } from "zod";

export default function useWatchStore<
  AppModelType,
  DbModelType extends DocumentData,
  SchemaType extends z.ZodTypeAny,
  T = z.infer<SchemaType>,
>(initial: T[], query: Query<AppModelType, DbModelType>, schema: SchemaType) {
  const data = useRef<T[]>(initial);

  const getSnapshot = useCallback(() => {
    return data.current;
  }, []);

  const subscribe = useCallback(
    (callback: () => void) => {
      const unsub = onSnapshot(query, (result) => {
        data.current = extractDocs(result, schema);
        callback();
      });

      return () => {
        unsub();
      };
    },
    [query, schema],
  );

  const store = useSyncExternalStore(subscribe, getSnapshot);

  return store;
}
