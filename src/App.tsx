import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools"
import CssBaseline from "@mui/material/CssBaseline"
import GlobalStyles from "@mui/material/GlobalStyles"
import { ThemeProvider } from "@mui/material/styles"
import { Authenticated, Refine } from "@refinedev/core"
import {
  RefineSnackbarProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/mui"
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/login"
import CreateProduct from "./pages/products/create"
import EditProduct from "./pages/products/edit"
import ListProducts from "./pages/products/list"
import ShowProduct from "./pages/products/show"
import { authProvider } from "./providers/auth"
import { dataProvider } from "./providers/data"
import ListCategories from "./pages/categories/list"

function App() {
  return (
    <BrowserRouter>
      {/* We're using Refine's Blue theme here. You can use other variants or create your own theme without constraints. */}
      <ThemeProvider theme={RefineThemes.BlueDark}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "protected-products",
                  list: "/products",
                  show: "/products/:id",
                  edit: "/products/:id/edit",
                  create: "/products/create",
                  meta: { label: "Products" },
                },
                // We're adding the categories resource to the resources array
                // This way, there will be a link to the categories list in the sidebar
                {
                  name: "categories",
                  list: "/categories",
                  meta: { label: "Categories" },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    // We're wrapping our routes with the `<Authenticated />` component
                    // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
                    // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
                    <Authenticated key="authenticated-routes" redirectOnFail="/login">
                      <ThemedLayoutV2
                        Title={(props) => {
                          return <ThemedTitleV2 {...props} text="Refine Tutorial" />
                        }}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    // We're also replacing the <Navigate /> component with the <NavigateToResource /> component.
                    // It's tailored version of the <Navigate /> component that will redirect to the resource's list route.
                    element={<NavigateToResource resource="protected-products" />}
                  />
                  <Route path="/products">
                    <Route index element={<ListProducts />} />
                    <Route path=":id" element={<ShowProduct />} />
                    <Route path=":id/edit" element={<EditProduct />} />
                    <Route path="create" element={<CreateProduct />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<ListCategories />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      {/* We're also replacing the <Navigate /> component with the <NavigateToResource /> component. */}
                      {/* It's tailored version of the <Navigate /> component that will redirect to the resource's list route. */}
                      <NavigateToResource resource="protected-products" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
