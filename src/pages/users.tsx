import { useQuery } from '@apollo/client'

import { UsersTable } from '@/components/UsersTable'
import { graphql } from '@/gql'

// const GET_LOCATIONS = gql`
//   query GetLocations {
//     locations {
//       id
//
//       name
//
//       description
//
//       photo
//     }
//   }
// `

const UsersPage = () => {
  return (
    <>
      <UsersTable />
    </>
  )
}

export default UsersPage
