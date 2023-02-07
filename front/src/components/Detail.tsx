import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getGame } from '../helpers/api'

export default function Detail() {
  const { id } = useParams()
  const {
    data: game,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['game', id],
    queryFn: () => getGame(id),
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    staleTime: 0,
    cacheTime: 20000,
  })

  if (isLoading) {
    return <div className='h-screen'>Cargando...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className='bg-black-0'>
      <div className='py-11 px-24 flex gap-3'>
        <div className='flex-1'>
          <img
            className='w-1/2 rounded-sm mx-auto'
            src={game.img}
            alt={game.name}
          />
          <p>Carrusel</p>
          <h2 className='font-uBold text-3xl text-black-100 my-3'>
            {game.name}
          </h2>
          <div className='flex items-center mb-4'>
            <span className='text-lg text-black-100 mr-4'>
              ⭐ {game.rating}/5
            </span>
            <span>
              <svg
                className='inline'
                width='14px'
                height='14px'
                viewBox='0 0 256 257'
              >
                <g>
                  <path
                    d='M0,36.3573818 L104.619084,22.1093454 L104.664817,123.02292 L0.0955693151,123.618411 L0,36.3573818 Z M104.569248,134.650129 L104.650452,235.651651 L0.0812046021,221.274919 L0.0753414539,133.972642 L104.569248,134.650129 Z M117.25153,20.2454506 L255.967753,6.21724894e-15 L255.967753,121.739477 L117.25153,122.840723 L117.25153,20.2454506 Z M256,135.599959 L255.96746,256.791232 L117.251237,237.213007 L117.056874,135.373055 L256,135.599959 Z'
                    fill='#2c2c2c'
                  ></path>
                </g>
              </svg>
            </span>
          </div>
          {/* <span className='text-black text-sm'>{game.rating}/5</span> */}
          <p className='text-black-75 font-extrabold'>
            {game.genre.map((genre) => (
              <span className='text-sm text-white py-1 px-2 bg-primary rounded-lg'>
                {genre}
              </span>
            ))}
          </p>
        </div>
        <div className='flex-mid flex items-center'>
          <div className='h-2/4 border-2 border-primary rounded-sm w-full p-4'>
            <p className='text-xl font-extrabold mt-2 mb-6'>
              ${game.price} ARS
            </p>
            <button className='mb-2 text-center w-full text-white bg-primary py-2 px-4 rounded-md'>
              Comprar ahora
            </button>
            <button className='flex justify-center items-center gap-2 text-primary  w-full border-primary border-2 py-2 px-4 rounded-md'>
              <svg
                viewBox='0 0 24 24'
                fill='#FE4E39'
                stroke='#FE4E39'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                width='18'
                height='18'
              >
                <circle cx='9' cy='21' r='1'></circle>
                <circle cx='20' cy='21' r='1'></circle>
                <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
              </svg>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <div className='w-3/4 px-24 text-black-100 mb-8'>
        <h3 className='text-2xl font-extrabold mb-4'>Descripcion</h3>
        <p className='text-justify text-sm text-black-75 mb-8'>
          {game.description}
        </p>
        <h3 className='text-2xl font-extrabold mb-4'>Detalles del producto</h3>
        <ul className='table'>
          <li className='table-row'>
            <div className='table-cell pr-5 pb-2'>Fecha de lanzamiento</div>
            <div className='table-cell'>{game.year}</div>
          </li>
          {/* <li className='table-row'>
            <div className='table-cell pr-5 pb-2'>Editor</div>
            <div className='table-cell'>{game.}</div>
          </li> */}
          <li className='table-row'>
            <div className='table-cell pr-5 pb-2'>Desarrolladores</div>
            <div className='table-cell'>{game.developer}</div>
          </li>
        </ul>
      </div>
    </div>
  )
}
