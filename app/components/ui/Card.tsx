import React, { ReactNode } from 'react'

interface CardProps{
    children: React.ReactNode
}
const Card = ({children}: CardProps) => {
  return (
    <div className="w-96 rounded-lg border border-transparent px-6 py-10 border-neutral-700 bg-neutral-800/30">{children}</div>
  )
}

export default Card