import React from 'react'
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"] });

interface IFredokaTitle {
    className?: string
    children: React.ReactNode
}

const FredokaTitle : React.FC<IFredokaTitle> = ({className, children}) => {
  return (
    <h1 className={fredoka.className + " " + className}>{children}</h1>
  )
}

export default FredokaTitle