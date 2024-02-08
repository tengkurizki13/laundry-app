import { useEffect,useState } from "react";

export default function usePost(url,payload,changePage) {
    const BASEURL = "http://localhost:3000/"
    fetch(BASEURL + url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
  })
     .then(response => changePage(url))
    
}