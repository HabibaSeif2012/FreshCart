import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useCategories() {


function getAllBrands(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
}


let Brands=useQuery(
    {
      queryKey:['getBrands'],
      queryFn: getAllBrands,
      staleTime:20000,
      gcTime:7000,
      select:(data)=> data.data.data
    }


  )



  return Brands;
    
}