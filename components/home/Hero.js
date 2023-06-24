import { useEffect } from 'react';
import {motion} from 'framer-motion';
import {fadeIn} from "../../utils/motion";
import HeroWrapper from "../../hoc/HeroWrapper";

const Hero = () => {
    useEffect(() => {
        const handleParallax = () => {
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach((element) => {
                const speed = Number(element.getAttribute('data-speed'));
                const yPos = -(window.pageYOffset * speed);
                const mediaQuery = window.matchMedia('(max-width: 768px)');

                if (mediaQuery.matches) {
                    // Ajuster la vitesse de défilement pour les écrans plus petits
                    const smallScreenSpeed = speed * 0.5;
                    const smallScreenYPos = -(window.pageYOffset * smallScreenSpeed);
                    // @ts-ignore
                    element.style.transform = `translate3d(0px, ${smallScreenYPos}px, 0px)`;
                } else {
                    element.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
                }
            });
        };

        window.addEventListener('scroll', handleParallax);
        return () => window.removeEventListener('scroll', handleParallax);
    }, []);

    return (
        <motion.section variants={fadeIn("", "", 0, 1)} className="hero flex justify-center">
            <div className="parallax max-w-full mx-3 h-full mt-14" data-speed={0.2}>
                <img src="https://r4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-01b69d213afe95f35634472bcdf74a70.jpg" alt=""/>
            </div>
        </motion.section>
    );
};

export default HeroWrapper(Hero, "hero");
