import dynamic from "next/dynamic";
import { ComponentPropsWithRef, FC, ReactElement } from "react";

const CACHE_CAPACITY = 20;

class IconCache extends Map<string, FC<ComponentPropsWithRef<"svg">>> {
  constructor(...args: ConstructorParameters<typeof Map<string, FC<ComponentPropsWithRef<"svg">>>>) {
    super(...args)
  }

  set(key: string, component: FC<ComponentPropsWithRef<"svg">>) {
    const size = this.size;

    if (size > CACHE_CAPACITY) {
      const first = Array.from(this.keys())[0];
      super.delete(first);
    }
    super.set(key, component);
    return this;
  }
}

const cache = new IconCache();

type TLoadIconOptions = {
  fallback: ReactElement;
  cache: boolean;
};

export default function loadIcon(name: string, options?: TLoadIconOptions) {
  const { fallback, cache: cacheEnabled } = options ?? {
    fallback: undefined,
    cache: true,
  };
  if (cacheEnabled && cache.has(name)) {
    return cache.get(name)!;
  }
  return dynamic<ComponentPropsWithRef<"svg">>(
    () =>
      import(`@/shared/assets/icons/${name}.svg`).then((component) => {
        cache.set(name, component.default);
        return component;
      }),
    { loading: fallback ? () => fallback : undefined }
  );
}
