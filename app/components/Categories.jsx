"use client";
import { useRouter } from "next/navigation";
import { categories } from "@/app/data/products";
import { motion } from "framer-motion";

export default function Category() {
  const router = useRouter();

const handleCategoryClick = (category) => {
  router.push(`/products/category/${category.id}`);
};

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        

        {/* Categories Row */}
        <motion.div
          className="flex gap-6 overflow-x-auto scrollbar-hide py-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleCategoryClick(category)}
              className="flex-shrink-0 w-44 cursor-pointer group"
            >
              <motion.div
                className="rounded-xl overflow-hidden shadow-md border border-gray-200"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.p
                className="text-center mt-3 font-medium text-gray-700 group-hover:text-black"
                whileHover={{ color: "#000" }}
              >
                {category.name}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
