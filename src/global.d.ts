declare module "*?imagetools" {
  const href: string;
  export default href;
}

type InferLoader<T> = Awaited<ReturnType<T>>;
