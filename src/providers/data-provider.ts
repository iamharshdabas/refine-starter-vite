import type { DataProvider } from "@refinedev/core"

const API_URL = "https://api.fake-rest.refine.dev"

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`)

    if (response.status < 200 || response.status > 299) throw response

    const data = await response.json()

    return { data }
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status < 200 || response.status > 299) throw response

    const data = await response.json()

    return { data }
  },
  getList: async ({ resource, pagination, filters, sorters }) => {
    const params = new URLSearchParams()

    if (pagination) {
      params.append("_start", (pagination.current - 1) * pagination.pageSize)
      params.append("_end", pagination.current * pagination.pageSize)
    }

    if (sorters && sorters.length > 0) {
      params.append("_sort", sorters.map((sorter) => sorter.field).join(","))
      params.append("_order", sorters.map((sorter) => sorter.order).join(","))
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          params.append(filter.field, filter.value)
        }
      })
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`)

    if (response.status < 200 || response.status > 299) throw response

    const data = await response.json()
    const total = Number(response.headers.get("x-total-count"))

    return {
      data,
      total,
    }
  },
  create: async ({ resource, variables }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status < 200 || response.status > 299) throw response

    const data = await response.json()

    return { data }
  },
  getMany: async ({ resource, ids }) => {
    const params = new URLSearchParams()

    if (ids) {
      ids.forEach((id) => params.append("id", id))
    }

    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`)

    if (response.status < 200 || response.status > 299) throw response

    const data = await response.json()

    return { data }
  },
  deleteOne: () => {
    throw new Error("Not implemented")
  },
  getApiUrl: () => API_URL,
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },
}
