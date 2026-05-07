export default function Card({coin}){

    return (
              <div>                    
                    {coin.name} - {coin.current_price}
              </div>
            
    )       
}