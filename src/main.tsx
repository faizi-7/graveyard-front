import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import ReactGA from 'react-ga4'

const queryClient= new QueryClient()
ReactGA.initialize("G-DFPSK2D0H5");
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client= {queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
)
