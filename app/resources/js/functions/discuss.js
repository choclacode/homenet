import io from 'socket.io-client'

import { $ } from '../utils'

export const discuss = () => {
  const socket = io()
  const name = $('.links ul li#name').textContent.substring(9)
  const chatbox = $('#chatbox')
  const form = $('#sendmsg')
  const sendmsg = (data, isself = false) =>
    (chatbox.innerHTML += isself
      ? `<li class="self"><span class="msg">${data}</span></li>`
      : `<li><span class="name">${data.name}</span><span class="msg">${data.msg}</span></li>`)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = form.msg.value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    if (msg == '' || /^\s+$/g.test(msg)) return
    socket.emit('new-msg', { name, msg })
    sendmsg(msg, true)
    form.msg.value = ''
  })
  socket.on('sendmsg', sendmsg)
}
