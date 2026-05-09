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
            <TableHeader >
              <TableRow>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Symbol</TableHead>
                <TableHead className="text-gray-300">Icon</TableHead>
                <TableHead className="text-gray-300">Current Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
                {coindata.map((coin) => (
                
                <TableRow key={coin.id} className="h-12">
                  <TableCell>{coin.name}</TableCell>
                  <TableCell>{coin.symbol}</TableCell>
                  <TableCell>
                    <img src={coin.image} className="w-6 h-6"></img>
                    </TableCell>
                  <TableCell>{coin.current_price}</TableCell>
                </TableRow>
                                
                ))}                
            </TableBody>
        </Table>
        </>

    )

}