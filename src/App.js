import React, { useCallback, useState } from "react";
import { render } from "react-dom";
import "./App.css";
const THEMES = {
  dark: {
    background: "#000",
    color: "#fff"
  },
  light: {
    background: "#fff",
    color: "#000"
  }
};
const ThemeContext = React.createContext(THEMES.dark);

export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(function () {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);
  const currentTheme = theme === "light" ? THEMES.light : THEMES.dark;
  return (
    <div className="App">
      <ThemeContext.Provider value={currentTheme}>
        <Toolbar  />
      </ThemeContext.Provider>
      <button onClick={toggleTheme} >Change Theme</button>
    </div>
  );
}

function ThemeButton({ children }) {
  const value = React.useContext(ThemeContext);
  return <button style={value}>{children} </button>;
}

// The class way :
class ThemedButtonClass extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          return <button style={value}>{this.props.children} </button>;
        }}
      </ThemeContext.Consumer>
    );
  }
}

function Toolbar({ theme }) {
  return (
    <div>
      <SearchForm />
      <ThemeButton style={theme}>Subscribe</ThemeButton>
    </div>
  );
}

function SearchForm() {
  return (
    <div>
      <input type="text" />
      <ThemedButtonClass>Search</ThemedButtonClass>
    </div>
  );
}