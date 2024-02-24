
import React from "react";
import { WebApi } from "../api";
import { branchID } from "../Constant";
//addbook location
export const addBookLocation=async(block, shelf_name, rack_name, sub_rack_name, status)=>{
    return await fetch(`${WebApi}/create-book-location`,{
     method:"POST",
     credentials: "include",
     headers:{
       "Content-Type": "application/json",
       cookie: document.cookie,
     },
     body: JSON.stringify({
        block:block,
        shelf_name:shelf_name,
        rack_name:rack_name, 
        sub_rack_name:sub_rack_name, 
         status:status,
         branch_id:branchID
     }),
    }).then((response) => response.json());
}
//get block
export const getBlock=async()=>{
return await fetch(`${WebApi}/get-blocks/${branchID}`,{
 method:"GET",
 credentials: "include",
 headers: {
   cookie: document.cookie,
 },
}).then((response) => response.json());
}
//get all location
export const getAllLocations=async()=>{
    return await fetch(`${WebApi}/get-all-locations/${branchID}`,{
     method:"GET",
     credentials: "include",
     headers: {
       cookie: document.cookie,
     },
    }).then((response) => response.json());
    }
//updatebook location
    export const updateBookLocation = async (id, block, shelf_name, rack_name, sub_rack_name, status) => {
        return await  fetch(`${WebApi}/update-book-location/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              cookie: document.cookie,
            },
            body: JSON.stringify({
                 block, 
                 shelf_name, 
                 rack_name,
                  sub_rack_name, 
                  status 
                }),
          }).then((response) => response.json());
    }