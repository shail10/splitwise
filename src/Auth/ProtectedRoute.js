import React from 'react'
import { Authenticate } from './Authenticate'

const ProtectedRoute = (Component) => (props) => {
  const auth = Authenticate()

  return <>{auth.isAuthenticated ? <Component {...props} /> : <h1>Erro</h1>}</>
}
export default ProtectedRoute
