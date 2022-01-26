import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    theme === "light" ? setChecked(false) : setChecked(true);
  },[checked]);
  const toggle = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <div className="relative inline-block w-12 mr-2  align-middle select-none transition duration-[20000000] ease-in">
      <input
        onChange={toggle}
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={checked}
        className="bg-yellow-300 border-yellow-500 mt-1 mr-1 focus:ring-transparent toggle-checkbox absolute block w-6 h-6 rounded-full border-2 appearance-none cursor-pointer"
      />
      <label
        htmlFor="toggle"
        className="toggle-label block h-8 -ml-1 rounded-full bg-green-400 cursor-pointer"></label>
    </div>
  );
}
