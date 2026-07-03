import { motion } from "framer-motion";

function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className={`${color} rounded-2xl p-6 shadow-xl text-white`}
    >
      <h3 className="text-lg">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-3">
        {value}
      </h1>
    </motion.div>
  );
}

export default StatCard;