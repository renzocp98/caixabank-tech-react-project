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
import PriceChange from "./PriceChange"

export default function NFTsCarousel({ nfts }) {
  return (
    <Carousel className="p-12 px-20" opts={{ align: 'start', loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
      <CarouselContent className="-ml-0">
        {nfts.map((nft) => (
          <CarouselItem key={nft.id} className="basis-1/3 hover:bg-cg-card-green p-4 transition-colors rounded-xl">
            <Link to={`/nfts/${nft.id}`}>
              <Card className="bg-cg-card-green hover:bg-cg-card-blue border-cg-green/20 transition-colors rounded-xl h-full">
                <CardHeader className="flex-row items-center gap-3 pb-2">
                    <CardTitle className="text-white text-sm truncate">{nft.name}</CardTitle>
                    <CardTitle className="text-cg-green text-sm">{nft.symbol}</CardTitle>
                    <CardAction>
                        <img src={nft.image.small} className="w-6 h-6 rounded-lg" />
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">
                          {nft.floor_price.usd.toLocaleString()} $
                        </span>
                        <PriceChange value={nft.floor_price_in_usd_24h_percentage_change} />
                      </div>
                    </div>
                  
                </CardContent>
                <CardFooter className="flex justify-between border-cg-green/20">

                  <div className="items-center justify-between">
                      <span className="text-gray-400 text-xs">Market Cap </span>
                      <span className="text-white">${nft.market_cap.usd.toLocaleString()}</span>
                    </div>
                </CardFooter>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
