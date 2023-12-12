import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['900'] });

const Hero = () => {
    return (
        <div className='hero py-14'>
            <div className="hero-container w-[600px] mx-auto text-center">
                <h1 className={`${poppins.className} text-5xl font-bold mb-4 capitalize`}>discover & share <br /> <span className='text-[orangered]'>AI-Powered Prompts</span></h1>
                <p>promtopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts</p>
            </div>
        </div>
    )
}

export default Hero;