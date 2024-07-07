import { useOne } from "@refinedev/core"

const ShowProduct = () => {
  const { data, isLoading } = useOne()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>Product name: {data?.data.name}</div>
}

export default ShowProduct
