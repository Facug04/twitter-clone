import { Link } from 'react-router-dom'

type Props = {
  _id: string
  name: string
  price: number
  img: string
}

export default function Game({ _id, img, name, price }: Props) {
  return (
    <Link to={`/game/${_id}`}>
      <div className='px-3'>
        <img
          className='hover:scale-110 hover:brightness-75 rounded-md transition ease-in-out duration-500'
          src={img}
          alt={name}
        />
      </div>
      <div className='w-full bottom-0 relative z-50 flex py-4 px-2 justify-between items-center text-black-100'>
        <div>
          <h4 className='font-uBold font-light text-base'>{name}</h4>
        </div>
        <div className=''>
          <button className='py-2 px-4 hover:bg-primaryDark transition ease-in-out duration-400 bg-primary text-xs text-white rounded-md'>
            ${price} Comprar
          </button>
        </div>
      </div>
    </Link>
  )
}

{
  /* <svg width='12px' height='12px' viewBox='0 0 256 257'>
            <g>
              <path
                d='M0,36.3573818 L104.619084,22.1093454 L104.664817,123.02292 L0.0955693151,123.618411 L0,36.3573818 Z M104.569248,134.650129 L104.650452,235.651651 L0.0812046021,221.274919 L0.0753414539,133.972642 L104.569248,134.650129 Z M117.25153,20.2454506 L255.967753,6.21724894e-15 L255.967753,121.739477 L117.25153,122.840723 L117.25153,20.2454506 Z M256,135.599959 L255.96746,256.791232 L117.251237,237.213007 L117.056874,135.373055 L256,135.599959 Z'
                fill='#2c2c2c'
              ></path>
            </g>
          </svg> */
}
