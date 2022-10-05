import { createContext, useState } from "react";

let NavContext = createContext({});
NavContext.displayName = "NavContext";

function Provider<T = any>({
  children,
  store,
}: {
  children: JSX.Element;
  store: T;
}) {
  const [value, setValue] = useState(store);

  return (
    <NavContext.Provider
      value={{
        store: value,
        dispatchStore: setValue,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export default NavContext;
export { Provider };
