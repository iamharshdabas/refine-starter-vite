import { Authenticated, Refine } from "@refinedev/core"
import ListProducts from "./pages/products/list"
import { dataProvider } from "./providers/data"
import { authProvider } from "./providers/auth"
import Login from "./pages/auth/login"
import Header from "./components/header"

function App() {
  return (
    <Refine dataProvider={dataProvider} authProvider={authProvider}>
      <Authenticated key="protected" fallback={<Login />}>
        <Header />
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  )
}

export default App
