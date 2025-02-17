import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useCategories() {


function getAllCategories(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}


let Category=useQuery(
    {
      queryKey:['getCategories'],
      queryFn: getAllCategories,
      staleTime:20000,
      gcTime:7000,
      select:(data)=> data.data.data
    }


  )



  return Category;
    
}
