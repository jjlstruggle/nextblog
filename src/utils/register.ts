export default function (
  target: Window | Element | Document,
  eventName: keyof WindowEventMap | DocumentEventMap | ElementEventMap,
  callback: () => void
) {
  target.addEventListener(eventName as string, callback);
  return () => {
    target.removeEventListener(eventName, callback);
  };
}
