import { useState, useEffect } from "react"
import { db } from "../data/db"
import { useMemo } from "react" //useMemo es un hook para limpiar el codigo eliminando () de los state derivados, ya que no es necesario llamarlos 


export const useCart = () => {

    const initialCart = () => {//con esta const le estamos diciendo que el state inicia revisando el localStorage y si no hay nada que devuelva un array vacio
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
      const MIN_ITEMS = 1
    
      useEffect(() =>{ //utilizando este hook no ahorramos el problema asincronico del frameworks, y nos agrega al carrito de manera inmedianta
        localStorage.setItem('cart', JSON.stringify(cart))//por lo que cada vez que cart se actualice, inmediatamente el item se agregara al localStorage
      }, [cart])
    
      function addToCart(item) {
    
        const itemExists = cart.findIndex(guitar => guitar.id === item.id) //de esta forma modifico la forma de usar state sin modificar al state directamente
          if (itemExists >= 0) {//agrega elementos al carritos si no estan agregados
            const updatedCart = cart
            updatedCart[itemExists].quantity++
            setCart([...updatedCart])
          }else {//controla elementos del carrito o al agregar si estan agregados, no lo agrega de nuevo
            item.quantity = 1
            setCart([...cart, item])
          }
        }
    
      function removeFromCart(id) {//esta funcion elimina elementos del carrito
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity(id) {//esta funcion aumenta la cantidad de elementos del carrito con +
        const updatedCart = cart.map( item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity +1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id) {// esta funcion disminuye la cantidad de elementos del carrito con -
        const downloadCart = cart.map( item => {
          if(item.id === id && item.quantity > MIN_ITEMS) {
            return {
              ...item,
              quantity: item.quantity -1
            }
          }
          return item
        })
        setCart(downloadCart)
      }
    
      function clearCart(e) {//esta funcion limpia el carrito con el boton 'vaciar carrito'
        setCart([])
      }

          //state derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce ((total, item) => total + (item.quantity * item.price), 0), [cart])//formar de calcular el total de la compra

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }

}