import { ErrorBoundary } from "./ErrorBoundary";

// we want to mock the following since these are side effects we don't want to take part in our tests

// by default, error boundaries display diagnostics information to the console
// since we expect the error in this certain case, we mute it, not to pollute the output
export const mockConsoleError = () => {
  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => {});
  return () => {
    spy.mockRestore();
  };
};

// in new versions of react, stack trace includes not only specific code lines but also full file paths
// not only line codes are very likely to break in snapshots, but also different people will have completely
// different full file paths on their local machines
export const mockErrorBoundaryStackTrace = () => {
  const errorInfoSpy = jest
    .spyOn(ErrorBoundary.prototype, "formatErrorInfo")
    .mockImplementationOnce((errorInfo: React.ErrorInfo) => ({
      componentStack: `
      this is a mock component stack
      for snapshot purposes
      don't worry`,
    }));

  return () => {
    errorInfoSpy.mockRestore();
  }
}
