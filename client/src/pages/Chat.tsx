import React, { useState, useEffect, useRef } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'

type Message = {
  type: 'sent' | 'received'
  text: string
  timestamp: Date
}

const Chat = () => {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const handleSend = () => {
    if (message.trim() !== '') {
      setConversation((prevConversation) => [
        ...prevConversation,
        { type: 'sent', text: message, timestamp: new Date() },
      ])
      setMessage('')
    }
    // Echo the sent message
    setConversation((prevConversation) => [
      ...prevConversation,
      { type: 'received', text: message, timestamp: new Date() },
    ])
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [conversation])

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Typography variant='h4' gutterBottom>
        Chat
      </Typography>
      <Box
        component='div'
        sx={{
          height: '50vh',
          width: '80%',
          overflowY: 'scroll',
          border: '1px solid black',
          p: 2,
          mb: 2,
        }}
      >
        {conversation.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: message.type === 'sent' ? 'row-reverse' : 'row',
              mb: 2,
            }}
          >
            <Typography
              sx={{
                backgroundColor:
                  message.type === 'sent' ? 'lightblue' : 'lightgreen',
                borderRadius: '12px',
                p: 1,
                mx: 1,
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
            >
              {message.text}
            </Typography>
            <Typography variant='caption'>
              {message.timestamp.toLocaleTimeString()}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <TextField
        variant='outlined'
        placeholder='Type a message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.altKey) {
            e.preventDefault()
            setMessage((prevMessage) => prevMessage + '\n')
          } else if (e.key === 'Enter') {
            e.preventDefault()
            handleSend()
          }
        }}
        multiline
        maxRows={5}
      />
      <Button onClick={handleSend}>Send</Button>
    </Box>
  )
}

export default Chat
