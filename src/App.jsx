import Header from "./Components/Header"
import Guitar from "./Components/Guitar"
import { useCart } from "./hook/useCart" //Hook creado por mi usando 

//utilizacion de los hooks
//utilizacion de stat (los state son inmutables, no se pueden modificar,para hacerlo hayque crear una function hija que los utilice y modificar esa)

function App() {

  const  { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } = useCart()

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
      isEmpty={isEmpty}
      cartTotal={cartTotal}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) =>( /*iterando la base de datos con .map*/
              <Guitar
                key={guitar.id}
                guitar= {guitar}
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
