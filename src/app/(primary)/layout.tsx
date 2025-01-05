import React from 'react'
import DefaultNavbar from '../ui/DefaultNavbar'

export default function layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <DefaultNavbar />
            <main>{ children }</main>
        </div>
    )
}
