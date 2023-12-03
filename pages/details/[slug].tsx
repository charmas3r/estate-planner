import React from "react";
import {Footer} from "@/components/Footer";

const DetailsPage = () => {
    return (
        <div className="bg-base-100">
            <main>
                <div className="hero from-primary to-accent text-primary-content min-h-screen bg-gradient-to-br py-10 lg:py-20 ">
                    <div className="hero-content flex-col lg:flex-row my-10 lg:my-20">
                        <div>
                            <div>
                                <h2 className="mt-4 mb-2 text-4xl font-extrabold md:text-6xl">See your trust details</h2>
                            </div>
                            <div className="py-6">You can see all the details of your trust here.</div>
                            <div className="card glass bg-opacity-60 text-primary-content m-auto">
                                <div className="card-body">
                                    <h1 className="mb-5 text-5xl font-bold card-title">Get help now</h1>
                                    <p className="mb-5">Fast, reliable service at your fingertips! Get in contact with us right
                                        away so we can get to you as soon as today! We’re just a click away.</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary"> EDIT</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default DetailsPage;