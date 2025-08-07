import { ExtractVariables, SubmitFormState } from "@/actions/utils/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type SubmitFormCallbacks<T> = {
  onSuccess?: (state: SubmitFormState<T>) => void;
  onError?: (state: SubmitFormState<T>) => void;
};

export function useSubmitForm<T>(
  serverAction: (
    prevState: SubmitFormState<Omit<T, "variables">>,
    data: ExtractVariables<T>,
  ) => Promise<SubmitFormState<Omit<T, "variables">>>,
  { onSuccess, onError }: SubmitFormCallbacks<T> = {},
) {
  const [state, setState] = useState<SubmitFormState<T>>({
    data: null,
    error: [],
    message: null,
    isError: false,
    isSuccess: false,
    statusCode: null,
  });

  const formAction = useCallback(async (data: ExtractVariables<T>) => {
    const response = (await serverAction(state, data)) as SubmitFormState<T>;
    setState((prev) => ({ ...prev, ...response }));
    return response;
  }, []);

  useEffect(() => {
    if (state?.isError) {
      typeof onError === "function"
        ? onError(state)
        : toast.error(state?.message);
    }
    if (state?.isSuccess) {
      typeof onSuccess === "function"
        ? onSuccess(state)
        : toast.success(state?.message);
    }
  }, [state]);

  return {
    action: formAction,
    state,
  };
}
