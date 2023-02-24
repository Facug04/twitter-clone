import { format, formatDistanceStrict } from 'date-fns'
import { es } from 'date-fns/locale'

export function timeAgoFormat(createdAt: Date): string {
  const timeAgo = formatDistanceStrict(new Date(createdAt), new Date(), {
    addSuffix: true,
    locale: es,
  })

  if (timeAgo.includes('horas') || timeAgo.includes('hora')) {
    const hourAgo = timeAgo.split(' ')[1]

    return hourAgo + 'h'
  }
  if (timeAgo.includes('minutos') || timeAgo.includes('minuto')) {
    const hourAgo = timeAgo.split(' ')[1]

    return hourAgo + 'min'
  }

  if (timeAgo.includes('segundos') || timeAgo.includes('segundo')) {
    const hourAgo = timeAgo.split(' ')[1]

    return hourAgo + 's'
  }

  const date = format(new Date(createdAt), 'd MMM.', {
    locale: es,
  })

  return date
}
