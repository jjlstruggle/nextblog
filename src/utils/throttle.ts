export default function throttle(callback: Function, wait?: number) {
  wait = wait || 500;
  let timer: ReturnType<typeof setTimeout> | null;
  return () => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      timer = null;
      callback();
    }, wait);
  };
}
