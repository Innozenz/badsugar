import Layout from '../components/Layout';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Works from '../components/home/Works';
import axios from "axios";

export default function Home({works}) {
  return (
      <Layout title="Accueil">
        <Hero />
        <About />
        <Works works={works}/>
      </Layout>
  )
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('https://badsugar.vercel.app/api/admin/getWorks');
        const works = response.data;
        return {
            props: { works },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { works: [] },
        };
    }
}
