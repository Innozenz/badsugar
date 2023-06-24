import {motion} from 'framer-motion';
import {fadeIn, textVariant} from "../../utils/motion";
import {SectionWrapper} from "../../hoc";

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">BadSugar</p>
                <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Overview.</h2>
            </motion.div>
            <motion.p variants={fadeIn("", "", 0.1, 1)}
                      className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]">
                I&apos;m a skilled software developer with experience in TypeScript and JavaScript, expertise in frameworks
                like React, Node.js, Next.js, and Express.js, and a passion for building scalable, testable, and
                maintainable web applications.
            </motion.p>
        </>
    );
}

export default SectionWrapper(About, "about");
