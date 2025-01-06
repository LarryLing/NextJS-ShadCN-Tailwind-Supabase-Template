import React from "react";
import { Button } from "../components/buttons";

export default function Home() {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div>Buttons</div>
                <div className="flex justify-center items-center gap-4">
                    <Button type="primary">Primary</Button>
                    <Button type="secondary">Secondary</Button>
                    <Button type="tertiary">Tertiary</Button>
                    <Button type="success">Success</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="call-to-action">Call To Action</Button>
                </div>
            </div>
        </>
    );
}
