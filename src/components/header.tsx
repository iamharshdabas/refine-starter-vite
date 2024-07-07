import { useGetIdentity, useLogout } from "@refinedev/core"

const Header = () => {
  const { mutate, isLoading } = useLogout()
  const { data: identity } = useGetIdentity()

  return (
    <>
      <h2>
        <span>Welcome, </span>
        <span>{identity?.name ?? ""}</span>
      </h2>
      <button type="button" disabled={isLoading} onClick={mutate}>
        Logout
      </button>
    </>
  )
}

export default Header
