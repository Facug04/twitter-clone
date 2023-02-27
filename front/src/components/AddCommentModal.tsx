import { useState } from 'react'

import { postComment } from '../helpers/api'
import Emoji from './icons/Emoji'
import Gift from './icons/Gift'
import Images from './icons/Images'
import Loader from './icons/Loader'
import Program from './icons/Program'
import Survey from './icons/Survey'
import Ubication from './icons/Ubication'
import Verified from './icons/Verified'
import img from '/user-icon.png'

type Props = {
  image: string | undefined
  actualUser: string | undefined | null
  id: string
  changeModal: () => void
  description: string
  username: string
  timeAgo: string
  changeComment?: (com: string) => void
}

export default function AddCommentModal({
  id,
  image,
  actualUser,
  changeModal,
  username,
  description,
  timeAgo,
  changeComment,
}: Props) {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    if (comment.length >= 1 && comment.length < 300) {
      setLoading(true)
      postComment(id, image, actualUser, comment)
        .then(() => {
          if (changeComment) {
            changeComment(comment)
          }
          changeModal()
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    }
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        changeModal()
      }}
      className='w-screen h-screen fixed flex justify-center top-0 left-0 bg-[#5b708366] z-[300] cursor-default'
    >
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        className='w-full min-[650px]:max-h-[346px] h-full min-[650px]:w-[600px] bg-black min-[650px]:rounded-2xl min-[650px]:mt-8'
      >
        <div className='h-[53px] pl-1 pr-4 flex items-center justify-between mb-3'>
          <button
            onClick={changeModal}
            className='px-3 text-[28px] rounded-[50%] hover:bg-[#eff3f41a] duration-200 ease-linear text-[#EFF3F4]'
          >
            &times;
          </button>
          <p className='text-primary py-1 px-4 text-[14.5px] font-chirp-bold rounded-2xl hover:bg-imageHover duration-200 ease'>
            Tweets no enviados
          </p>
        </div>
        <div className='h-[105px] px-4'>
          <div className='flex gap-3 mb-[2px]'>
            <div className='w-12 h-12 items-center flex justify-center'>
              {image ? (
                <img className='w-12 h-12 rounded-[50%]' src={image} />
              ) : (
                <img className='w-10 h-10' src={img} />
              )}
            </div>
            <div className='flex-1'>
              <div className='flex items-center justify-between text-base'>
                <div className='flex gap-2'>
                  <div className='flex gap-1 items-center'>
                    <p className='font-chirp-bold text-pri max-[695px]:text-[15px]'>
                      {username}
                    </p>
                    {image && <Verified />}
                  </div>
                  <p className='text-third text-[15px] min-[695px]:text-base'>
                    · {timeAgo}
                  </p>
                </div>
              </div>
              <div>
                <p className=' text-[#d5d7d8] text-[17px]'>{description}</p>
              </div>
            </div>
          </div>
          <div className='flex h-10 items-center gap-3'>
            <div className='w-12 h-10 flex justify-center items-center'>
              <div className='w-[2px] bg-[#333639] h-full' />
            </div>
            <p className='text-[#71767B]'>
              Respondiendo a <span className='text-primary'>@{username}</span>
            </p>
          </div>
        </div>
        <div className='flex px-4 gap-3 max-h-[176px] h-full'>
          <div className='w-12' />
          <div className='flex-1'>
            <form>
              <div className='py-3 mb-3'>
                <textarea
                  value={comment}
                  name='comment'
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                  placeholder='Twittea tu respuesta'
                  className='h-24 text-pri text-normal outline-none resize-none bg-transparent  w-full placeholder:text-normal placeholder:text-secondary'
                />
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                  <div className='hover:bg-imageHover rounded-[50%] w-[34px] h-[34px] flex items-center justify-center'>
                    <Images />
                  </div>
                  <div className='flex items-center justify-center w-[34px] h-[34px]'>
                    <Gift />
                  </div>
                  <div className='flex items-center justify-center w-[34px] h-[34px]'>
                    <Survey />
                  </div>
                  <div className='max-[375px]:hidden flex items-center justify-center w-[34px] h-[34px]'>
                    <Emoji />
                  </div>
                  <div className='max-[375px]:hidden flex items-center justify-center w-[34px] h-[34px]'>
                    <Program />
                  </div>
                  <div className='max-[375px]:hidden flex items-center justify-center w-[34px] h-[34px]'>
                    <Ubication />
                  </div>
                </div>
                <button
                  onClick={onSubmit}
                  className={`${
                    comment.length >= 1
                      ? 'bg-primary text-white'
                      : 'bg-[#0e4e78] text-[#808080]'
                  } ${
                    loading && 'px-10'
                  } text-base font-chirp-bold py-[6px] px-3  rounded-[18px] hover: duration-200 ease-linear`}
                >
                  {loading ? (
                    <Loader w='w-5' h='h-5' color='fill-white' />
                  ) : (
                    'Responder'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
