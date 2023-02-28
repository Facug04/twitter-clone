import Profile from './Profile'
import goncy from '/goncy.jpg'
import midudev from '/midudev.jpg'
import fazt from '/fazt.jpg'

export default function Follow() {
  return (
    <div className='pt-2 bg-[#16181c] rounded-3xl'>
      <h3 className='text-pri text-normal font-chirp-heavy px-4 mb-2'>
        A quién seguir
      </h3>
      <Profile name='goncy.tsx' username='goncy' img={goncy} />
      <Profile name='Miguel Á. Durán' username='midudev' img={midudev} />
      <Profile name='Fazt' username='FaztTech' img={fazt} />
      <div className='h-[52px] hover:bg-twittHover px-4 duration-200 ease-in-out flex items-center'>
        <p className=' text-primary text-base'>Mostrar más</p>
      </div>
    </div>
  )
}
