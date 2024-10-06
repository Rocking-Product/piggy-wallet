"use client"

import Step1 from "@/components/AddChildren/Step1"
import Step3 from "@/components/AddChildren/Step3"
import Step2 from "@/components/AddChildren/Step2"


import { useState, useEffect } from "react"
import Success from "@/components/AddChildren/Success"

export interface IChild {
    name: string
    birthDay: string
    email: string
}

const AddChildrenPage = () => {
    const [step, setStep] = useState(1)
    const [amountOfChildren, setAmountOfChildren] = useState(0)
    const [children, setChildren] = useState<IChild[]>([])

    useEffect(() => {
        if (amountOfChildren > 0 && children.length < amountOfChildren) {
            setChildren([...children, { name: '', birthDay: '', email: '' }])
        }
    }, [amountOfChildren])

    console.log(amountOfChildren)

    return (
        <div>
            {step === 1 && <Step1
                setStep={setStep}
                amountOfChildren={amountOfChildren}
                setAmountOfChildren={setAmountOfChildren}
                setChildren={setChildren}
            />}
            {children.map((child, index) => (
                index + 2 === step && (
                    <Step2
                        key={index}
                        setStep={setStep}
                        setChildren={setChildren}
                        step={step}
                        index={index}
                    >{children}</Step2>
                )
            ))}
            {step === (amountOfChildren + 2) &&
                <Step3
                    setStep={setStep}
                    step={step}
                >{children}</Step3>}
            {step === (amountOfChildren + 3) && <Success/>}
        </div>
    )
}

export default AddChildrenPage