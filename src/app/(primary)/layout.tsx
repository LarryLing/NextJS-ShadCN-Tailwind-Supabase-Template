import React from 'react'
import Navbar from '../ui/navbar';

export default function layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <Navbar />
            <main className="p-4">{ children }</main>
        </div>
    )
}
