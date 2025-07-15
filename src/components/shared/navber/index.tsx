"use client"
import { Button } from '@/components/ui'
import { Search } from 'lucide-react'
import Image from 'next/image'
import logoImg from "@/assets/logo.png"
import { useLogin } from '@/components/common/login-provider'
import { PlaceholderImg } from '@/lib/utils'
import Img from '@/components/reuseable/img'

export default function Navber() {
    // const headerRef = useRef<HTMLDivElement>(null);
    const { login, setIsLogin } = useLogin()
    // console.log(login)

    // useEffect(() => {
    //     const el = headerRef.current;
    //     const onScroll = () => el?.classList.toggle('navber-box-shadow', window.scrollY > 0);
    //     window.addEventListener('scroll', onScroll);
    //     return () => window.removeEventListener('scroll', onScroll);
    // }, []);
    // ref={headerRef}


    return (
        <div>
            <ul className="relative  z-10 max-w-screen px-20 flex items-center flex-wrap space-y-2 md:space-y-0 justify-center md:justify-between py-8">
                <li> <div className="relative w-40 h-11 rounded-full overflow-hidden mr-3">
                    <Image
                        src={logoImg}
                        alt={"author.name"}
                        fill
                        className="object-cover"
                    />
                </div></li>
                <li>
                    <div className="flex items-center  rounded-full bg-[white] px-2  w-full md:max-w-5xl mx-auto">
                        <input
                            type="text"
                            placeholder="Service"
                            className="flex-1 h-full px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676] text-base"
                            aria-label="Service search input"
                        />
                        <div />
                        <input
                            type="text"
                            placeholder="Location"
                            className="flex-1 h-full px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676] text-base border-l-[1px] border-[#A0A0A0]"
                            aria-label="Location search input"
                        />
                        <Button variant={"primary"} className='w-[120px] px-0  h-11 my-1 rounded-full has-[>svg]:px-0'>
                            <Search className="w-5 h-5" />
                            Search
                        </Button>
                    </div>
                </li>
                <li>

                    {login ? (
                        <Button onClick={() => setIsLogin(false)} variant={"primary"} className='h-12 pl-2 pr-4 rounded-full'>
                            <Img src={PlaceholderImg(100, 100)} className='size-10' title='img' />Md Julfiker Islam</Button>)
                        : (<Button variant={"primary"} onClick={() => setIsLogin(true)} className='h-12 px-4 rounded-full'>Sign in to your Account</Button>)}</li>
            </ul>
            <style jsx global>{`
                    .navber-box-shadow {
                        position:fixed;
                        top: 0;
                        left: 0;
                        width:100%;
                        z-index: 99999;
                        background-color:#f6f6f6;
                        animation:navber_animation 1s;
                    }

                    @keyframes navber_animation{
                        from{
                            top:-40px;
                        }
                        to{
                            top:0px;
                        }
                    }
      `}</style>
        </div>

    )
}
