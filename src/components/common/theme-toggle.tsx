import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@providers/theme-provider"

import { Button } from "@components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        if (theme === "light") {
          setTheme("dark")
        } else if (theme === "dark") {
          setTheme("system")
        } else {
          setTheme("light")
        }
      }}
    >
      {theme === "light" ? (
        <Sun className="size-5" />
      ) : theme === "dark" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
