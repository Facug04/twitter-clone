import { Verified } from './icons/TweetsIcons'

type Props = {
  name: string
  username: string
  img: string
}

export default function Profile({ name, username, img }: Props) {
  return (
    <a href={`https://twitter.com/@${username}`} target='_blank'>
      <div className='px-4 h-[72px] flex items-center justify-between hover:bg-twittHover duration-200 ease-in-out'>
        <div className='flex items-center gap-3'>
          <div>
            <img className='rounded-[50%]' src={img} alt='goncy' />
          </div>
          <div>
            <div className='flex items-center gap-1'>
              <p className='text-base text-pri font-chirp-bold'>{name}</p>
              <Verified />
            </div>
            <p className='text-[15px] leading-5 text-secondary'>@{username}</p>
          </div>
        </div>
        <div>
          <button className='px-4 py-[5px] bg-[#eff3f4] text-[#0F1419] font-chirp-bold rounded-2xl text-[15px]'>
            Seguir
          </button>
        </div>
      </div>
    </a>
  )
}
