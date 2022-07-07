import React from 'react'
import { SSRAuth } from '../../utils/SSRAuth'

export default function Vehicles() {
  return (
    <div>Página vehicles</div>
  )
}

export const getServerSideProps = SSRAuth(async (ctx) => {
  return {
    props: {}
  }
})
