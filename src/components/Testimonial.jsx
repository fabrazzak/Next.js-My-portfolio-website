"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaUpwork } from "react-icons/fa6";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO at TechSolutions",
        content:
            "Working with Abdur was an absolute pleasure. His attention to detail and problem-solving skills helped us deliver our project ahead of schedule. The quality of his code is exceptional, and he's always willing to go the extra mile.",
        rating: 5,
        image:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Product Manager at InnovateX",
        content:
            "Abdur's expertise in the MERN stack transformed our web application. His ability to understand complex requirements and translate them into elegant solutions is remarkable. Highly recommended for any full-stack project!",
        rating: 5,
        image:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Marketing Director at BrandHub",
        content:
            "We hired Abdur for a WordPress project, and the results exceeded our expectations. He delivered a beautiful, responsive site that perfectly captured our brand identity. His communication throughout the process was excellent.",
        rating: 4,
        image:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg",
    },
    {
        id: 4,
        name: "David Wilson",
        role: "CTO at StartupVision",
        content:
            "Abdur's technical skills are matched only by his professionalism. He helped us architect a scalable solution that will grow with our business. His knowledge of modern web technologies is truly impressive.",
        rating: 5,
        image:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg",
    },
    {
        id: 5,
        name: "Lisa Thompson",
        role: "Director at DigitalAgency",
        content:
            "Abdur's work on our React application was outstanding. He implemented complex features with clean, maintainable code and helped improve our overall architecture.",
        rating: 5,
        image:
            "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg",
    },
];

const TestimonialCard = ({ testimonial }) => {
    return (
        <motion.div className="min-w-[300px] sm:min-w-[400px] lg:min-w-[450px] p-4 ">
            <div className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-800/90 rounded-2xl border border-cyan-400/30 p-6 shadow-lg shadow-cyan-400/10">
                <FaQuoteLeft className="text-cyan-400/20 text-3xl mb-4" />
                <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`text-sm ${i < testimonial.rating ? "text-yellow-400" : "text-gray-600"}`}
                        />
                    ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-3 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/30">
                        <motion.img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-xs text-cyan-400 flex items-center gap-2">
                            {testimonial.role}
                            <FaUpwork className="text-green-400 text-2xl" />
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
    const carouselRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            const scrollWidth = carouselRef.current.scrollWidth;
            const offsetWidth = carouselRef.current.offsetWidth;
            setWidth(scrollWidth - offsetWidth);
        }
    }, []);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    const handleDragEnd = (event, info) => {
        const cardWidthWithGap = 450; // Width of each card including gap
        const dragX = -info.offset.x; // Positive if dragged left

        // Calculate index from drag distance, clamp within bounds
        const newIndex = Math.round(dragX / cardWidthWithGap);
        const clampedIndex = Math.min(Math.max(newIndex, 0), testimonials.length - 1);

        setCurrentIndex(clampedIndex);
    };

    return (
        <section className="relative py-16 px-4 sm:px-6 bg-gray-900 overflow-hidden">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    What Clients <span className="text-cyan-400">Say</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Don't just take my word for it — here's what my clients have to say about working with me.
                </p>
            </motion.div>

            <motion.div
                ref={carouselRef}
                className="cursor-grab overflow-hidden"
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.div
                    className="flex gap-6"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    animate={{ x: -currentIndex * 450 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onDragEnd={handleDragEnd}
                >
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </motion.div>
            </motion.div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-4 mb-8 pt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-4 h-4 rounded-full transition ${
                            currentIndex === index ? "bg-cyan-400" : "bg-gray-700 hover:bg-cyan-500"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
