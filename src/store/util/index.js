export const messageToDisplay = (message) => {
  // console.log(message.response)
  const processMessage = message.response
    ? message.response.data
      ? message.response.data.message
        ? message.response.data.message
        : message.response.data.error
        ? message.response.data.error
        : 'Something went wrong. Try again later.'
      : 'Something went wrong. Try again later.'
    : message.message
    ? message.message
    : 'Something went wrong. Try again later.'

  let stringifiedErrorMessage

  if (Array.isArray(processMessage)) {
    stringifiedErrorMessage = processMessage.join('\r\n')
  } else {
    stringifiedErrorMessage = processMessage
  }

  return stringifiedErrorMessage
}
