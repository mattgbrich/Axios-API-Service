import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import Icon from '@mui/material/Icon'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { clearError } from './store/actions/notificationsActions'

function Notifications() {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.notifications)

  const handleClose = () => dispatch(clearError())

  return (
    <>
      <Dialog
        open={error.open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            position: 'fixed',
            top: 15,
            m: 0
          }
        }}
      >
        <DialogTitle
          sx={{
            color: 'error.main',
            variant: 'h2',
            lineHeight: 4
          }}
        >
          <Icon
            fontSize="large"
            sx={{
              marginRight: 2,
              position: 'relative',
              top: '10px'
            }}
          >
            error
          </Icon>
          {`Oops, something went wrong!`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Status: {error.status}<br />
            Message: {error.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Notifications
