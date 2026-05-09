import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function NftTable({nftdata}){

    return(
      
        <Table>
            <TableCaption>A list of NFTs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Platform name</TableHead>
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