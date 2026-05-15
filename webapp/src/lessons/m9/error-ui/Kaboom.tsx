import React, { useEffect } from "react";

import { useErrorScreen } from "./ErrorScreenContext";
import { getUserErrorMessage } from "./messages";

interface KaboomSyncProps {
  shouldFail?: () => boolean;
  notify?(message: string): void
};

const throwAlways = () => true

export const KaboomSync: React.FC<KaboomSyncProps> = props => {
  const { shouldFail = throwAlways, notify, children } = props;
  if (shouldFail()) {
    notify?.("KaboomSync: fail");
    throw new Error("Kaboom!");
  }
  notify?.("KaboomSync: pass");
  return <>{children}</>;
};

interface KaboomAsyncProps {
  kaboomFn: () => Promise<unknown>
  layout: "ERROR_PAGE" | "ERROR_MODAL"
}

export const KaboomAsync: React.FC<KaboomAsyncProps> = props => {
  const { kaboomFn, layout } = props;

  const { showError } = useErrorScreen();
  useEffect(() => {
    kaboomFn().catch((error: unknown) => {
      showError({
        layout,
        message: getUserErrorMessage(error),
      });
    });
  }, [layout, kaboomFn, showError]);

  return <div>this will blink</div>;
};
