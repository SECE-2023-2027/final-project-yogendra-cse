"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const page = () => {
    
    
    
     

    return (
        <div>
            <nav>
                <ul className='flex h-[90px] text-[20px] justify-center items-center bg-black text-white gap-[750px] px-12 py-5'>
                    <div>Complaint logo</div>
                    <div className='flex justify-end gap-[40px] text-teal-200'>
                        <Link href="/newComplaint"><li>Raise a complaint</li></Link>
                        <Link href="/userDashboard"><li>Dashboard</li></Link>
                        <Link href="/userProfile"><li>My Profile</li></Link>
                        
                        
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default page