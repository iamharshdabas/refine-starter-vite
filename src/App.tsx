import { Refine } from "@refinedev/core"
import ListProducts from "./pages/products/list"
import { dataProvider } from "./providers/data-provider"

function App() {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowProduct /> */}
      {/* <EditProduct /> */}
      <ListProducts />
      {/* <CreateProduct /> */}
    </Refine>
  )
}

export default App
