"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * A custom React hook for updating the URL's query parameters in a Next.js App Router app.
 * @example
 * ```tsx
 * const { params, updateParams } = useUpdateParams()
 *
 * function test() {
 *   // Update or add a query parameter
 *   params.set("test", "new value")
 *
 *   // Push the updated query string to the URL without rerendering server components
 *   updateParams(params, { shallow: true })
 * }
 * ```
 *
 * @note The `params` object is a clone of the current URLSearchParams.
 *       You must modify it and pass it to `updateParams` to apply changes.
 */
export function useUpdateParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  function updateParams(
    newParams: URLSearchParams,
    { replace = false, shallow = false } = {},
  ) {
    const queryString = `?${newParams.toString()}`;

    if (shallow && typeof window !== "undefined") {
      const url = `${window.location.pathname}${queryString}`;

      if (replace) {
        window.history.replaceState({}, "", url);
      } else {
        window.history.pushState({}, "", url);
      }

      return;
    }

    if (replace) {
      router.replace(queryString);
    } else {
      router.push(queryString);
    }
  }

  return {
    params,
    updateParams,
  };
}
