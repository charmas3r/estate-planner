import {SearchBar} from "@/components/SearchBar";
import {CreateButton} from "@/components/CreateButton";
import {ContentTable} from "@/components/ContentTable";

export const Landing = () => {
    return (
        <div className="hero mx-4 h-full w-full bg-fixed min-h-screen">
            <div className="hero-overlay bg-opacity-20">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font text-center mt-5 lg:mt-20 mr-5 ml-5">Estate Planning dApp</h1>
                <div className="flex flex-col w-full gap-10 lg:gap-40 lg:flex-row mt-20 ml-20">
                    <SearchBar/>
                    <CreateButton/>
                </div>
            </div>
            <div className="hero-content text-center text-neutral-content mt-40">
                <ContentTable/>
            </div>
        </div>
    )
}
