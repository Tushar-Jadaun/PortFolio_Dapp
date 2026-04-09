import { useState } from "react";

 
export function App() {
  const[wallet,setWallet]=useState<string[]>([])
  return (
    <div >
      <b>
          <button onClick={()=>{
            if(window.backpack){
              setWallet(w=>[...w,"backpack"])
            }
            if(window.solflare){
              setWallet(w=>[...w,"solflare"])
            }
            if(window.phantom){
              setWallet(e=>[...e,"phantom"])
            }
          }
            }>Connect with you wallet</button>
      </b>
      <div>
        {wallet.map(wallet=><button>{wallet}</button>)}
      </div>
    </div>
  );
}

export default App;
