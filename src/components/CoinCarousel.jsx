import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import PriceChange from "./PriceChange";


export default function CoinCarousel({ coins }) {
  return (
    <Carousel className="p-12 px-20" opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
      <CarouselContent className="-ml-0" >
        {coins.map((coin) => (
          <CarouselItem key={coin.id} className="basis-1/3 hover:bg-cg-card-green p-4 transition-colors rounded-xl">
            <Link to={`/coins/${coin.id}`}>
                <Card className="bg-cg-card-green hover:bg-cg-card-blue border-cg-green/20 transition-colors rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">{coin.name}</CardTitle>
                    <CardTitle className="text-cg-green text-sm">{coin.symbol}</CardTitle>
                    <CardAction>
                      <img src={coin.image} className="w-6 h-6" />
                    </CardAction>
                  </CardHeader>
                  <CardContent className="text-1xl font-bold text-white">
                    {coin.current_price} $
                  </CardContent>
                  <CardFooter className="flex justify-between border-cg-green/20">
                    <div >
                      <span className="p-1 text-white">High: {coin.high_24h}</span>
                      <span className="p-1 text-white">Low: {coin.low_24h}</span>
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