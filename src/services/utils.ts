import {
  type DocumentData,
  getDocs,
  type Query,
  type QuerySnapshot,
} from "firebase/firestore";
import * as R from "remeda";
import type { z } from "zod";

export function parseFormWithSchema<T extends z.ZodTypeAny>(
  form: FormData,
  schema: T,
): Promise<z.infer<T>> {
  return schema.parseAsync(Object.fromEntries(form.entries()));
}

export async function executeQuery<
  AppModelType,
  DbModelType extends DocumentData,
  SchemaType extends z.ZodTypeAny,
>(query: Query<AppModelType, DbModelType>, schema: SchemaType) {
  const result = await getDocs(query);
  return extractDocs(result, schema);
}

export function extractDocs<
  AppModelType,
  DbModelType extends DocumentData,
  SchemaType extends z.ZodTypeAny,
>(
  snapshot: QuerySnapshot<AppModelType, DbModelType>,
  schema: SchemaType,
): z.infer<SchemaType>[] {
  return R.pipe(
    snapshot.docs,
    R.map((doc) => (doc.exists() ? { ...doc.data(), id: doc.id } : null)),
    R.filter(R.isNonNull),
    R.map((item) => {
      console.log(schema);

      const result = schema.safeParse(item);
      if (result.error) {
        console.log("Failed to parse", item);
        return null;
      }
      return result.data;
    }),
    R.filter(R.isNonNull),
  );
}
