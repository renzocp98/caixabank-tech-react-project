import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CoinTable({coindata}){

    return(
      <>
        <Table>
            <TableCaption>A list of Coins</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>High 24h</TableHead>
                <TableHead>Low 24h</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
                {coindata.map((coin) => (
                <>
                <TableRow>
                  <TableCell>{coin.name}</TableCell>
                  <TableCell>{coin.symbol}</TableCell>
                  <TableCell>
                    <img src="{coin.image}"></img>
                    </TableCell>
                  <TableCell>{coin.current_price}</TableCell>
                  <TableCell>{coin.market_cap}</TableCell>
                  <TableCell>{coin.high_24h}</TableCell>
                  <TableCell>{coin.low_24h}</TableCell>
                  <TableCell>{coin.last_updated}</TableCell>
                </TableRow>
                </>                
                ))}                
            </TableBody>
        </Table>
        </>

    )

}