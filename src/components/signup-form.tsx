import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { GoogleIcon, DiscordIcon, GithubIcon } from "./icons/icon";

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
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
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" required/>
                        </div>  
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <div className="flex justify-center items-center">
                            <Separator className="w-28"/><span className="mx-2">or</span><Separator className="w-28"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button className="w-full bg-google hover:bg-google/90 text-background">
                                Login With Google
                                <GoogleIcon className="size-6"/>
                            </Button>
                            <Button className="w-full bg-discord hover:bg-discord/90 text-background">
                                Login With Discord
                                <DiscordIcon className="size-6"/>
                            </Button>
                            <Button className="w-full bg-github hover:bg-github/90 text-background">
                                Login With Github
                                <GithubIcon className="size-6"/>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="underline underline-offset-4">
                            Login
                        </a>
                    </div>
                </form>
                </CardContent>
            </Card>
        </div>
    );
}
