import React from "react";
import {Footer} from "@/components/Footer";

const EditPage = () => {
    return (
        <div className="bg-base-100">
            <main>
                <div className="hero from-primary to-accent text-primary-content min-h-screen bg-gradient-to-br py-10 lg:py-20 ">
                    <div className="hero-content flex-col lg:flex-row my-10 lg:my-20">
                        <div>
                            <div>
                                <h2 className="mt-4 mb-2 text-4xl font-extrabold md:text-6xl">Update your trust</h2>
                            </div>
                            <div className="py-6">You can update the details of your trust here.</div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default EditPage;