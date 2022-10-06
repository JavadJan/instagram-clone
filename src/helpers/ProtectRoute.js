import { render } from '@testing-library/react'
import { PropTypes } from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/Routes'

export const ProtectRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render = {({location})=>{
        if (user) {
          return children
        }

        if (!user) {
          return (
            <Redirect to = {{
              pathname: ROUTES.Login,
              state : {from : location}
            }}/>
          )
        }
      }}
    />
  )
}
