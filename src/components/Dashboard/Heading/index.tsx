import React from 'react'


const navs = [
    {
        title: 'See All',
        isSelected: true,
    },
    {
        title: 'Matt',
        isSelected: false,
    },
    {
        title: 'Lucy',
        isSelected  : false,
    }
]

interface IHeadingDashboard {
    setChild : (child: string) => void
    child : string
    setTab: (tab: string) => void
    tab?: string
}

const HeadingDashboard : React.FC<IHeadingDashboard> = ({setChild, child, setTab}) => {

    const handleClick = (child: string) => {
        setChild(child)
    }


  return (

        <div className='flex justify-between w-full pt-4'>
                {navs.map((nav, index) => (
                    <div onClick={() => handleClick(nav.title)}  key={index} className={`border-b-2 pt-2 grow text-center  ${child === nav.title ? ' text-brand/80 border-brand/80' : 'text-neutral-400'} `}>
                        <p>{nav.title}</p>
                    </div>
                ))}
        </div>        

  )
}

export default HeadingDashboard