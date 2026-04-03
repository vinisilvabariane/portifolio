import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import I18nProvider from './i18n/I18nProvider.tsx'
import { ThemeModeProvider } from './theme/ThemeModeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <ThemeModeProvider>
          <App />
        </ThemeModeProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
