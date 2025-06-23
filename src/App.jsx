import { useState, useEffect } from "react"
import Header from "./Components/Header"
import Guitar from "./Components/Guitar"
import { db } from "./data/db"

//utilizacion de los hooks
//utilizacion de stat (los state son inmutables, no se pueden modificar,para hacerlo hayque crear una function hija que los utilice y modificar esa)

function App() {

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

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) =>( /*iterando la base de datos con .map*/
              <Guitar
                key={guitar.id}
                guitar= {guitar}  
                setCart= {setCart}
                addToCart={addToCart}                
              />
          ))}
        </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
