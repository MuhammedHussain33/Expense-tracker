import * as React from 'react'
import { cn } from '../../lib/utils'

const Tabs = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-full', className)}
    {...props}
  />
))
Tabs.displayName = 'Tabs'

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500',
      className
    )}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'

const TabsProvider = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

const TabsContext = React.createContext({
  activeTab: '',
  setActiveTab: () => {},
})

const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('useTabs must be used within TabsProvider')
  }
  return context
}

const TabsRoot = ({ children, defaultValue, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <Tabs {...props}>{children}</Tabs>
    </TabsContext.Provider>
  )
}

const TabsListWrapper = ({ children, ...props }) => {
  return <TabsList {...props}>{children}</TabsList>
}

const TabsTriggerWrapper = ({ value, children, ...props }) => {
  const { activeTab, setActiveTab } = useTabsContext()
  
  return (
    <TabsTrigger
      data-state={activeTab === value ? 'active' : 'inactive'}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </TabsTrigger>
  )
}

const TabsContentWrapper = ({ value, children, ...props }) => {
  const { activeTab } = useTabsContext()
  
  if (activeTab !== value) return null
  
  return <TabsContent {...props}>{children}</TabsContent>
}

export {
  TabsRoot as Tabs,
  TabsListWrapper as TabsList,
  TabsTriggerWrapper as TabsTrigger,
  TabsContentWrapper as TabsContent,
}
