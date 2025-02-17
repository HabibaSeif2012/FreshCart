import React from 'react'
import useBrands from '../../Hooks/useBrands';
export default function Brands() {

let {data,isError,isLoading,isFetching}= useBrands();

if (isLoading){
  return <><div className='h-screen flex items-center justify-center m-auto'><span class="loader "></span></div></>
}

if (isError){
  return <div  className='m-auto p-3 bg-red-500 text-white text-xl text-center'> {error}</div>
}
return <>


<div className='flex flex-wrap p-5 my-5 gap-5 justify-center items-center'>
      {data?.map((brand)=>
        <div className=" w-full lg:w-1/5 shadow-xl bg-transparent">
          <img src={brand?.image} className="w-full h-[200px] object-cover" alt="" />

          <h4 className="font-bold text-blue-900">{brand?.name}</h4>
        </div>
      )}

    
    </div>

   
  </>
   



  
}
