"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

const UpworkProfileSection = () => {
    return (
        <section className="relative py-12 pb-24 px-4 sm:px-6 bg-gray-900">
            {/* Background pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        My <span className="text-green-400">Upwork</span> Profile
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Verified top-rated profile with 100% job success
                    </p>
                </motion.div>

                {/* Scrollable Image Container */}
                <div className="relative max-h-[100vh] overflow-y-auto border border-green-400/20 rounded-2xl shadow-2xl shadow-green-400/10 custom-scrollbar">
                    <div className="w-full">
                        <Image
                            src="/upwork-profile-screenshot.png"
                            alt="Upwork profile screenshot"
                            width={1200}
                            height={2000}
                            quality={100}
                            className="w-full h-auto object-cover   "
                            priority
                        />
                    </div>

                    {/* Gradient overlay top */}
                    {/* <div className="absolute top-0 bottom-0 h-full  inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent pointer-events-none" /> */}

                    {/* Button */}

                </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <a
                    href="https://www.upwork.com/freelancers/~01cbcc4bb65e1d54ef?viewMode=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-400/20"
                >
                    View Full Profile <FaExternalLinkAlt className="text-sm" />
                </a>
            </div>
        </section>
    );
};

export default UpworkProfileSection;
