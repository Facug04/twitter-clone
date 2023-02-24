import Like from './icons/Like'
import CommentIcon from './icons/CommentIcon'
import Retwitt from './icons/Retwitt'
import See from './icons/See'
import Share from './icons/Share'
import More from './icons/More'
import Verified from './icons/Verified'
import { timeAgoFormat } from '../helpers/timeAgo'

type Props = {
  description: string
  createdAt: Date
  username: string
  image: string
  userComment: string
}

export default function Comment({
  description,
  createdAt,
  username,
  image,
  userComment,
}: Props) {
  const timeAgo = timeAgoFormat(createdAt)

  return (
    <div className=' border-[#2f3336] px-4  py-2 border-b-[1.5px] flex gap-3 hover:bg-twittHover duration-200 ease-in-out'>
      <div className='w-12 h-12 items-center flex justify-center'>
        <img className='w-12 h-12 rounded-[50%]' src={image} />
      </div>
      <div className='flex-1'>
        <div className='flex items-center justify-between text-base'>
          <div className='flex gap-2'>
            <div>
              <div className='flex gap-1 items-center'>
                <p className='font-chirp-bold text-pri'>{username}</p>
                {image && <Verified />}
                <p className='text-third'>· {timeAgo}</p>
              </div>
              <p className='text-[#71767B] text-[15px]'>
                En respuesta a{' '}
                <span className='text-primary'>@{userComment}</span>
              </p>
            </div>
          </div>
          <div>
            <More />
          </div>
        </div>
        <div>
          <p className='mb-2 text-[#d5d7d8] text-[17px]'>{description}</p>

          <div className='flex justify-between'>
            <div className='flex gap-8'>
              <div className='flex gap-3 items-center group fill-[#71767b] hover:fill-primary duration-200 ease-in cursor-pointer'>
                <div className='w-[34.75px] h-[34.75px] flex items-center justify-center group-hover:bg-imageHover group-hover:fill-primary rounded-[50%] duration-200 ease-in'>
                  <CommentIcon />
                </div>
              </div>

              <div className='flex gap-1 items-center'>
                <div className='w-[34.75px] h-[34.75px] flex items-center justify-center'>
                  <Retwitt />
                </div>
              </div>
              <div className='flex gap-1 group items-center cursor-pointer fill-[#71767b] duration-200 ease-in'>
                <div className='w-[34.75px] h-[34.75px] flex items-center justify-center group-hover:bg-likeHover group-hover:fill-[#f91880] rounded-[50%] duration-200 ease-in'>
                  <Like />
                </div>
              </div>

              <div className='flex gap-1 items-center'>
                <div className='w-[34.75px] h-[34.75px] flex items-center justify-center'>
                  <See />
                </div>
              </div>
              <div className='w-[34.75px] h-[34.75px] flex items-center justify-center'>
                <Share />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
