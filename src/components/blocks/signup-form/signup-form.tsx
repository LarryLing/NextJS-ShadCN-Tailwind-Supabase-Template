"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { loginWithDiscord, loginWithGithub, loginWithGoogle, signup } from "@/lib/actions";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon, DiscordIcon, GithubIcon } from "@/components/icons/icon";

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <div className={ cn("flex flex-col gap-6", className) } {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Create a free account with your email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                <form action={ action } className="text-sm">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input id="displayName" name="displayName" type="text"/>
                            { state?.errors?.displayName && <p className="text-sm text-destructive">{ state.errors.displayName }</p> }
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="text"/>
                            { state?.errors?.email && <p className="text-sm text-destructive">{ state.errors.email }</p> }
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password"/>
                            { 
                                state?.errors?.password && (
                                <div className="text-sm text-destructive">
                                    <p>Password must:</p>
                                    <ul>
                                        { 
                                            state.errors.password.map(error => (
                                                <li key={ error }>
                                                    - { error }
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>)
                            }
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password"/>
                            { state?.errors?.confirmPassword && <p className="text-sm text-destructive">{ state.errors.confirmPassword }</p> }
                        </div>
                        <div>
                            <Button type="submit" disabled={ pending } className="w-full">
                                Sign Up
                            </Button>
                            <div className="mt-2 text-center text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="hover:underline underline-offset-4">
                                    Login
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Separator className="w-24"/><span className="mx-2">Or continue with</span><Separator className="w-24"/>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={ loginWithGoogle } disabled={ pending } className="flex-1 bg-google hover:bg-google/90 text-background">
                                <GoogleIcon className="size-6"/>
                            </Button>
                            <Button onClick={ loginWithDiscord } disabled={ pending } className="flex-1 bg-discord hover:bg-discord/90 text-background">
                                <DiscordIcon className="size-6"/>
                            </Button>
                            <Button onClick={ loginWithGithub } disabled={ pending } className="flex-1 bg-github hover:bg-github/90 text-background">
                                <GithubIcon className="size-6"/>
                            </Button>
                        </div>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
    );
}
