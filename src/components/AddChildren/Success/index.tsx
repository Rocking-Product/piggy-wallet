import FredokaTitle from "@/components/Atoms/FredokaTitle"
import Button from "@/components/Button"
import Image from "next/image"
import {useRouter} from "next/navigation"
import piggy from "../../../../public/piggy.png"


export interface ISuccess {
   
}

const Success : React.FC<ISuccess> = () => {

    const router = useRouter()

    const onClickFinish = () => {
        router.push('/Dashboard')
    }

    return (
        <main className="h-screen flex flex-col">
        <div className="h-[400px] bg-brand flex justify-center items-end">
            <div className='relative justify-center -bottom-16 w-full'>
                <Image className='mx-auto' src={piggy} alt="Piggy Wallet Logo" width={250} height={250} />
            </div>
        </div>
        <div className='flex flex-col px-4 py-4 grow'>
            <div className='flex flex-col gap-2 mt-20'>
                <FredokaTitle className=" font-semibold text-[52px] text-center">All setup!</FredokaTitle>
                <p className='text-center'>We have sent an email to your children with a link to access their piggy wallets.</p>
            </div>
            <div className='items-end grow flex'>
                <div className='flex flex-col gap-y-4 items-center  justify-center w-full py-4'>
                    <Button onClick={onClickFinish}>Finish</Button>
                </div>
            </div>
        </div>
    </main>
    )
}

export default Success