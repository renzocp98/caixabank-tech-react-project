import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Link } from "react-router-dom"

export default function DerivativesCarousel({ exchanges }) {
  return (
    <Carousel className="p-12 px-20" opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
      <CarouselContent className="-ml-0">
        {exchanges.map((exchange) => (
          <CarouselItem key={exchange.id} className="basis-1/3 p-4 hover:bg-cg-card-green p-4 transition-colors rounded-xl">
            <Link to={`/derivatives/${exchange.id}`}>
              <Card className="bg-cg-card-green hover:bg-cg-card-blue border-cg-green/20 transition-colors rounded-xl h-full">
                <CardHeader>
                    
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white text-sm truncate">{exchange.name}</CardTitle>
                      <span className="text-gray-400 text-xs">Est. {exchange.year_established}</span>
                  </div>
                  <CardAction>
                    <img src={exchange.image}className="w-6 h-6 rounded-lg"/>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Open Interest</span>
                    <span className="text-white">{Number(exchange.open_interest_btc).toLocaleString()} BTC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">Vol 24h</span>
                    <span className="text-white">{Number(exchange.trade_volume_24h_btc).toLocaleString()} BTC</span>
                  </div>
                  <CardFooter className="flex justify-between border-cg-green/20">
                  <div className="items-center justify-between">
                    <span className="text-gray-400 text-xs">Pares Perpetuos </span>
                    <span className="text-white"> {exchange.number_of_perpetual_pairs}</span>
                  </div>
                  </CardFooter>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
