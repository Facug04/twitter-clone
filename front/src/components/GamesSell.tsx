import { useQuery } from '@tanstack/react-query'

import { getTrendingGames } from '../helpers/api'
import Game from './Game'

export default function GamesSell() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['games'],
    queryFn: getTrendingGames,
  })

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <section className='mt-14 font-bold mb-12 px-24'>
      <div className='my-4 mb-14 flex justify-between items-center'>
        <h2 className='text-3xl font-extrabold text-black-100'>Mas vendidos</h2>
        <button className='text-white bg-primary py-1 px-4 rounded-md hover:bg-primaryDark transition ease-in-out duration-400'>
          ver más
        </button>
      </div>
      <div className='grid gap-6 grid-cols-3 mb-6'>
        {data.slice(0, 3).map((game) => (
          <div
            className='h-auto cursor-pointer  overflow-hidden'
            key={game.name}
          >
            <Game
              _id={game._id}
              name={game.name}
              price={game.price}
              img={game.img}
            />
          </div>
        ))}
      </div>
      <div className='grid gap-6 grid-cols-2'>
        {data.slice(3, 5).map((game) => (
          <article
            className={`h-auto cursor-pointer overflow-hidden rounded-sm`}
            key={game.name}
          >
            <Game
              _id={game._id}
              name={game.name}
              price={game.price}
              img={game.img}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
