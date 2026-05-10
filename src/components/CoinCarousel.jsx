import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Link } from "react-router-dom"

function PriceChange({ value }) {
  if (value == null) return <span className="text-gray-400">—</span>
  return (
    <span className={value >= 0 ? 'text-green-400' : 'text-red-400'}>
      {value >= 0 ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
    </span>
  )
}

export default function CoinCarousel({ coins }) {
  return (
    <Carousel opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
      <CarouselContent>
        {coins.map((coin) => (
          <CarouselItem key={coin.id} className="basis-1/3 hover:bg-gray-800 p-4 transition-colors rounded-xl">
            <Link to={`/coins/${coin.id}`}>
                <Card className="bg-gray-800 hover:bg-gray-600 border-gray-700 transition-colors rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">{coin.name}</CardTitle>
                    <CardTitle className="text-gray-400 text-sm">{coin.symbol}</CardTitle>
                    <CardAction>
                      <img src={coin.image} className="w-6 h-6" />
                    </CardAction>
                  </CardHeader>
                  <CardContent className="text-1xl font-bold">
                    {coin.current_price} $
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-700" >
                    <div >
                      <span className="p-1">High: {coin.high_24h}</span>
                      <span className="p-1">Low: {coin.low_24h}</span>
                    </div>
                    <PriceChange value={coin.price_change_percentage_24h} />
                  </CardFooter>
                </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}