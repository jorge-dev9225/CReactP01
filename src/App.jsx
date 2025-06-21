import { useState } from "react"
import Header from "./Components/Header"
import Guitar from "./Components/Guitar"
import { db } from "./data/db"

//utilizacion de los hooks
//utilizacion de stat (los state son inmutables, no se pueden modificar,para hacerlo hayque crear una function hija que los utilice y modificar esa)
function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(item) {

    const itemExists = cart.findIndex(guitar => guitar.id === item.id) 
      if (itemExists >= 0) {
        const updatedCart = cart
        updatedCart[itemExists].quantity++
        setCart([...updatedCart])
        console.log('item ya agregado al carrito')
      }else {
        item.quantity = 1
        setCart([...cart, item])
        console.log('item agregado al carrito')
      }
    }

  return (
    <>
    <Header/>
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
