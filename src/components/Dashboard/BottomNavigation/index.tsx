"use client"

import React from 'react';
import { ITab } from '@/app/Dashboard/page';
import Image from 'next/image';
import { IChild } from '@/app/AddChildren/page';

interface BottomNavigationProps {
    tabs: ITab[];
    setTab: (tabName: string) => void;
    tab: string;
    setChild : (child: string) => void
    child : string
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ tabs, setTab, tab, setChild, child }) => {
    

    const handleClick = (tabName: string) => {
       setTab(tabName)
    }

    return (
        <div className='grid grid-cols-4 fixed bottom-0 right-0 left-0 justify-items-center'>
            {tabs.map((tabItem, index) => (
                <div key={index} className='flex flex-col items-center justify-center'>
                    <Image  
                        src={tab === tabItem.name ? tabItem.iconPurple! : tabItem.icon}
                        alt={tabItem.name}
                        width={30}
                        height={30}
                    />
                    <p 
                        className={tab === tabItem.name ? 'text-brand' : 'text-black'} 
                        onClick={() => handleClick(tabItem.name)}>
                        {tabItem.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default BottomNavigation;