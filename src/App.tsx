import './App.css'
import {Button} from "./common/components/Button.tsx";
import {createContext, ReactNode, useMemo, useState} from 'react';
import {ConfigProvider as ConfigProviderV4} from "antd4";
import {ConfigProvider as ConfigProviderV5} from "antd5";
import {Themes, ThemeTypes} from "./common/types";
import {Button as Ant5Button} from "antd5";

type ThemeContextType = {
  theme: ThemeTypes;
  changeTheme: (theme: ThemeTypes) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeContextProviderProps = {
  children: ReactNode;
  context: ThemeContextType;
};

export const ThemeContextProvider = ({ context, children }: ThemeContextProviderProps) => {
  return (
    <ThemeContext.Provider value={context}>
      {context.theme === Themes.V4 ?
        <ConfigProviderV4>
          {children}
        </ConfigProviderV4> :
        <ConfigProviderV5 prefixCls={Themes.V5} componentDisabled={true}>
          {children}
        </ConfigProviderV5>
      }
      <Ant5Button>Default config component</Ant5Button>
    </ThemeContext.Provider>
  );
}

function App() {
  const [theme, setTheme] = useState<ThemeTypes>(Themes.V4);

  const changeTheme = () => {
    if(checkUserAgentForIE) {
      setTheme(Themes.V4);
      return;
    }
    setTheme((theme: ThemeTypes) => (theme === Themes.V4 ? Themes.V5 : Themes.V4));
  };

  const checkUserAgentForIE = useMemo(() => {
    const ua = window.navigator.userAgent;
    const isIE10OrBelow = ua.indexOf("MSIE ") > 0; // IE 10 and below
    const isIE11 = ua.indexOf("Trident/") > 0; // IE 11
    const isLegacyEdge = ua.indexOf("Edge/") > 0; // Legacy Edge (EdgeHTML-based)

    return isIE10OrBelow || isIE11 || isLegacyEdge;
  }, []);


  const themeContextValue: ThemeContextType = {
    theme,
    changeTheme,
  };

  return (
    <>
      <ThemeContextProvider context={themeContextValue}>
        <div className="App">
          <header className="App-header">
            <h1>Changing themes POC</h1>
            <Button label={'change theme'} onClick={() => changeTheme()} />
          </header>
        </div>
      </ThemeContextProvider>
    </>
  );
}

export default App