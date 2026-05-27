import React from 'react'
import { ThemeToggle } from '@components/common/theme-toggle'
import { useTheme } from '@providers/theme-provider'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'

function App() {
  const { theme } = useTheme()
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Component Library</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Библиотека React компонентов на базе Tailwind CSS и Radix UI
          </p>
        </header>

        <main>
          <div className="grid gap-8 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Светлая тема</CardTitle>
                <CardDescription>Предпочтение для светлой цветовой схемы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Кнопка по умолчанию</Button>
                <Button variant="secondary" className="w-full">
                  Вторичная кнопка
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Тёмная тема</CardTitle>
                <CardDescription>Предпочтение для тёмной цветовой схемы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="destructive" className="w-full">
                  Опасное действие
                </Button>
                <Button variant="outline" className="w-full">
                  Обводка
                </Button>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardHeader>
                <CardTitle>Переключатель темы</CardTitle>
                <CardDescription>
                  Используйте кнопку в правом верхнем углу для переключения между светлой и тёмной темами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Тема сохраняется в localStorage и применяется автоматически при следующем посещении.
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-xs text-muted-foreground">Текущая тема: {theme}</span>
                <ThemeToggle />
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
