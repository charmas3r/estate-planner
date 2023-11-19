import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import {Landing} from "@/components/Landing";

export default function Home() {
    return (
        <div className="bg-base-100">
            <main>
                <div
                    className="from-base-100 to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-16">
                <Landing/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}