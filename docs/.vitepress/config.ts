import DefaultTheme from 'vitepress/theme'

/** @type {import('vitepress').Config} */
export default {
  lang: 'ru-RU',
  title: 'Component Library',
  description: 'Библиотека React компонентов на базе Tailwind CSS и Radix UI',
  themeConfig: {
    nav: [
      { text: 'Домой', link: '/' },
      { text: 'Компоненты', link: '/components/intro' },
      { text: 'Политика конфиденциальности', link: 'https://github.com/sbercloud' },
    ],
    sidebar: {
      '/components/': {
        base: '/components/',
        items: [
          { text: 'Введение', link: 'intro' },
          { text: 'Button (Кнопка)', link: 'button' },
          { text: 'Card (Карточка)', link: 'card' },
          { text: 'PeakHoursRangeSelector', link: 'peak-hours-range-selector' },
          { text: 'ThemeToggle (Переключатель темы)', link: 'theme-toggle' },
        ],
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vitepress' },
    ],
    footer: {
      message: ' Released under the MIT License.',
      copyright: 'Copyright © 2026 Component Library',
    },
  },
  head: [
    ['meta', { name: 'theme-color', content: '#3b87f9' }],
    ['meta', { name: 'og:title', content: 'Component Library' }],
    ['meta', { name: 'og:description', content: 'Библиотека React компонентов на базе Tailwind CSS и Radix UI' }],
  ],
  vite: {
    server: {
      port: 3001,
    },
  },
}
