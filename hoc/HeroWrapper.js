import {motion} from "framer-motion";
import {staggerContainer} from "../utils/motion";

const HeroWrapper = (Component, idName) =>
    function HOC () {
        return (
            <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className={`p-12 w-full mx-auto relative z-0`}
            >
                <span className="hash-span" id={idName}>
                    &nbsp;
                </span>
                <Component />
            </motion.section>
        )
    }
export default HeroWrapper;
