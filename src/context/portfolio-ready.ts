import { createContext, useContext } from 'react'

export const PortfolioReadyContext = createContext<boolean>(true)

export function usePortfolioReady(): boolean {
  return useContext(PortfolioReadyContext)
}
