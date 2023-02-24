// import { Link } from 'react-router-dom'

import Follow from './Follow'
import Search from './icons/Search'
import Trend from './Trend'

export default function Trending() {
  return (
    <div className='max-[1265px]:w-[350px] max-[1078px]:w-[290px]'>
      <div className='sticky top-0 z-30 py-1 bg-black mb-[14px]'>
        <div className='flex gap-5 items-center bg-[#202327] py-[10px] px-4 rounded-3xl'>
          <Search />
          <p className='text-base text-[#71767b]'>Buscar en twitter</p>
        </div>
      </div>
      <div className='bg-[#16181c] pt-2 rounded-xl mb-4'>
        <h2 className='text-pri text-normal font-chirp-heavy mb-[13px] px-4'>
          Qué está pasando
        </h2>
        <Trend type='Trabajo' trend='#BuscandoTrabajo' tweets='522 mil' />
        <Trend type='Desarrollo' trend='React y Express' tweets='102 mil' />
        <Trend type='Desarrollo' trend='MongoDB' tweets='47 mil' />
        <Trend type='Desarrollo' trend='HechoConReact-Express' tweets='500' />
        <Trend type='Personas' trend='Facundo Gonzalez' tweets='2' />
        <div className='h-[52px] hover:bg-twittHover px-4 duration-200 ease-in-out flex items-center'>
          <p className=' text-primary text-base'>Mostrar más</p>
        </div>
      </div>
      <Follow />
      <div className='px-5 text-secondary text-[14px] leading-4 flex gap-[9px] flex-wrap my-[14px]'>
        <span>Condiciones de Servicio</span>
        <span>Política de Privacidad</span>
        <span>Política de cookies</span>
        <span>Información de anuncios</span>
        <span>Más opciones</span>
        <span>© 2023 Nadie, Inc.</span>
      </div>
    </div>
  )
}
