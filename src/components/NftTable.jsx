import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function NftTable({nftdata}){

    return(
      
        <Table>
            <TableCaption>A list of NFTs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Symbol</TableHead>
                <TableHead className="text-gray-300">Platform name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              
                {nftdata.map((nftdata) => (
                <TableRow key={nftdata.id} className="h-12">
                  <TableCell>{nftdata.name}</TableCell>
                  <TableCell>{nftdata.symbol}</TableCell>
                  <TableCell>{nftdata.asset_platform_id}</TableCell>
                </TableRow>          
                ))}                
            </TableBody>
        </Table>
        

    )

}