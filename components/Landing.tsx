import Image from "next/image";
import {Header} from "@/components/Header";
import {SearchBar} from "@/components/SearchBar";

export const Landing = () => {
    return (
        <div className="hero mx-4 h-full w-full bg-fixed min-h-screen">
            <div className="hero-overlay bg-opacity-20">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font text-center mt-5 lg:mt-20 mr-5 ml-5">Estate Planning dApp</h1>
                <SearchBar/>
            </div>
            <div className="hero-content text-center text-neutral-content">
                <div className="flex flex-col w-full gap-10 lg:gap-40 lg:flex-row">

                </div>
            </div>
        </div>
    )
}
