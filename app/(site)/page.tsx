import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
   <div className="
    flex
    justify-center
    min-h-full
    flex-col
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
   ">
    <div className="sm:mx-auto md:w-full sm:max-w-md">
      <Image 
        src='/images/logo.png'
        alt='logo'
        height={48}
        width={48}
        className='mx-auto w-auto'
      />
      <h2 className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
        text-gray-900
      ">
        Sign in to your account
      </h2>
    </div>

    <AuthForm/>
    
   </div>
  )
}
