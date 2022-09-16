import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'

import useAPI from './store/hooks/useAPI';

function MyButton ({ onClick, label, isLoading, error }) {
  return (
    <div style={{marginBottom: 16}}>
      {error && <Typography variant="h6" sx={{backgroundColor: 'error.light', color: 'white', marginBottom: 2, width: 450}}>This is an optional inline error message</Typography>}
      <Button
        onClick={onClick}
        variant="contained"
        disabled={isLoading}
        color={error ? 'error' : 'primary'}
      >
        {error && <Icon sx={{marginRight: 2}}>error</Icon>}
        {isLoading ? <CircularProgress size={25}/> : label}
      </Button>
    </div>
  )
}

function Actions () {
  const [forbiddenLoading, setForbiddenLoading] = useState(false)
  const [unauthorizedLoading, setUnauthorizedLoading] = useState(false)
  const [notFoundLoading, setNotFoundLoading] = useState(false)
  const [timeoutLoading, setTimeoutLoading] = useState(false)
  const [teapotLoading, setTeapotLoading] = useState(false)
  const [serverErrLoading, setServerErrLoading] = useState(false)
  const [badGatewayLoading, setBadGatewayLoading] = useState(false)
  const [unavailableLoading, setUnavailableLoading] = useState(false)
  const [error, setError] = useState(false)

  const API = useAPI();
  const forbidden = () => API.get('/forbidden')
  const unauthorized = () => API.get('/unauthorized')
  const notFound = () => API.get('/not-found', null, {suppressErrors: [404]})
  const timeout = () => API.get('/timeout')
  const teapot = () => API.get('/teapot', null, {customMessageMap: {418: 'This is a Custom Message'}})
  const serverErr = () => API.get('/server-error')
  const badGateway = () => API.get('/bad-gateway')
  const unavailable = () => API.get('/unavailable')

  function createHandler (action, setLoading, label) {
    setLoading(true)
    action()
      .then(res => {
        console.log(`${label} RESPONSE: `, res)
      })
      .catch(err => {
        console.log(`${label} ERROR: `, err)
      })
      .finally(() => setLoading(false))
  }

  const handleForbidden = () => createHandler(forbidden, setForbiddenLoading, 'Forbidden')
  const handleUnauthorized = () => createHandler(unauthorized, setUnauthorizedLoading, 'Unauthorized')
  const handleTimeout = () => createHandler(timeout, setTimeoutLoading, 'Timeout')
  const handleTeapot = () => createHandler(teapot, setTeapotLoading, 'Teapot')
  const handleServerErr = () => createHandler(serverErr, setServerErrLoading, 'Server Error')
  const handleBadGateway = () => createHandler(badGateway, setBadGatewayLoading, 'Bad Gateway')
  const handleUnavailable = () => createHandler(unavailable, setUnavailableLoading, 'Unavailable')
  const handleNotFound = () => {
    setNotFoundLoading(true)
    notFound()
      .then(res => {
        console.log("NOT FOUND RES", res)
      })
      .catch(err => {
        console.log("NOT FOUND ERR", err)
        setError(true)
      })
      .finally(() => setNotFoundLoading(false))
  }

  return (
    <div style={{marginLeft: 16}}>
      <h2>API Actions</h2>
      <div>
        <MyButton
          onClick={handleForbidden}
          label={'forbidden'}
          isLoading={forbiddenLoading}
        />
        <MyButton
          onClick={handleUnauthorized}
          label={'unauthorized'}
          isLoading={unauthorizedLoading}
        />
        <MyButton
          onClick={handleNotFound}
          label="not found"
          isLoading={notFoundLoading}
          error={error}
        />
        <MyButton
          onClick={handleTimeout}
          label="Timeout"
          isLoading={timeoutLoading}
        />
        <MyButton
          onClick={handleTeapot}
          label="Teapot"
          isLoading={teapotLoading}
        />
        <MyButton
          onClick={handleServerErr}
          label="Server Error"
          isLoading={serverErrLoading}
        />
        <MyButton
          onClick={handleBadGateway}
          label="Bad Gateway"
          isLoading={badGatewayLoading}
        />
        <MyButton
          onClick={handleUnavailable}
          label="Unavailable"
          isLoading={unavailableLoading}
        />
      </div>
    </div>
  )
}

export default Actions
