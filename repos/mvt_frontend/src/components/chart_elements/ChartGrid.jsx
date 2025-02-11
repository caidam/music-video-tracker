import React from 'react'

export function ChartWrapper({ children }) {
    return (
      <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
          {children}
      </div>
    )
  }

export function ChartGridLeft({ children }) {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        {children}
    </div>
  )
}

export function ChartGridMiddle({ children }) {
  return (
    <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        {children}
    </div>
  )
}

export function ChartGridRight({ children }) {
    return (
      <div className="grid w-full flex-1 gap-6">
          {children}
      </div>
    )
  }