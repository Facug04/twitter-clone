import More from './icons/More'

type Props = {
  type: string
  trend: string
  tweets: string
}

export default function Trend({ type, trend, tweets }: Props) {
  return (
    <div className='flex items-center h-[82px] hover:bg-twittHover px-4 duration-200 ease-in-out'>
      <div className='flex justify-between w-full'>
        <div>
          <p className='text-[#71767B] text-sm'>{type} · Tendencia</p>
          <h3 className='text-pri font-chirp-bold'>{trend}</h3>
          <p className='text-[#71767B] text-sm'>{tweets} Tweets</p>
        </div>
        <div className='pt-1'>
          <More />
        </div>
      </div>
    </div>
  )
}
