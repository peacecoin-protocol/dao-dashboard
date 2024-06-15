import React from 'react'

import { Button } from '../ui/button'
import { cn } from '../utils'

import { SettingsIcon } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const AppBar: React.FC = () => {
  return (
    <header className="border-b bg-accent text-accent-foreground">
      <div className="container">
        <div className="grid grid-cols-app-bar">
          <div className="flex items-center gap-4 py-3">
            <h1 className="flex shrink-0 gap-2 font-inter text-xl">
              <div className="flex items-baseline gap-2 max-sm:hidden">
                Peace Coin DAO Dashboard
              </div>
            </h1>
          </div>
          {/* center */}
          <div />
          {/* right */}
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              size="sm"
              className={cn({
                'text-muted-foreground': true,
              })}
              asChild
            >
              <SettingsIcon className={cn('h-4 w-4 text-muted-foreground')} />
            </Button>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}
