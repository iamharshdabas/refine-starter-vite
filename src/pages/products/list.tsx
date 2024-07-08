import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useSelect } from "@refinedev/core"
import { List, EditButton, ShowButton, useDataGrid } from "@refinedev/mui"
import { useMemo } from "react"

const ListProducts = () => {
  const { dataGridProps } = useDataGrid<IProduct>({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    syncWithLocation: true,
  })

  const {
    options: categories,
    queryResult: { isLoading },
  } = useSelect<ICategory>({
    resource: "categories",
  })

  // We're defining the columns for our table according to the `<DataGrid />` component's `columns` prop.
  const columns = useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "category.id",
        headerName: "Category",
        minWidth: 250,
        flex: 0.5,
        // We're defining the column type as `singleSelect` and providing the options to the `valueOptions` prop.
        type: "singleSelect",
        valueOptions: categories,
        // Since now the options are in an object format, we need to provide the `valueFormatter` prop to pick the value of the option.
        valueFormatter: (params) => params?.value,
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading..."
          }

          return categories?.find((category) => category.value == row.category.id)?.label
        },
      },
      {
        field: "material",
        headerName: "Material",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "price",
        headerName: "Price",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <div>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </div>
          )
        },
      },
    ],
    [categories, isLoading],
  )

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  )
}

interface IProduct {
  id: number
  name: string
  material: string
  price: string
  category: ICategory
}

interface ICategory {
  id: number
  title: string
}

export default ListProducts
