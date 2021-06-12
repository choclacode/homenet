'use strict'

const auth = () => {
  const main = (path) => {
    const form = document.querySelector(`form#${path}`)
    const errors = {
      username: document.querySelector('.username.error'),
      nickname: path == 'signup' ? document.querySelector('.nickname.error') : '',
      password: document.querySelector('.password.error'),
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      errors.username.textContent = errors.password.textContent = ''

      const username = form.username.value
      const nickname = path == 'signup' ? form.nickname.value : ''
      const password = form.password.value

      try {
        const res = await fetch(`/auth/${path}`, {
          method: 'POST',
          body: JSON.stringify(path == 'signup' ? { username, nickname, password } : { username, password }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (data.errors) {
          errors.username.textContent = data.errors.username
          errors.password.textContent = data.errors.password
        }
        if (data.user) {
          location.pathname = '/'
        }
      } catch (err) {
        console.log(err.message)
      }
    })
  }

  return {
    signup: () => main('signup'),
    login: () => main('login'),
  }
}
const articles = () => {
  const main = (path, method) => {
    const form = document.querySelector('form.article')
    const article = {
      title: document.querySelector('.preview .title'),
      body: document.querySelector('.preview article'),
    }
    const errors = {
      title: document.querySelector('.title-err.error'),
      body: document.querySelector('.body-err.error'),
      slug: path == 'create' ? document.querySelector('.slug-err.error') : '',
    }
    const slugify = (str) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[\.?!]*/g, '')
        .replace('&', 'and')
        .replace(/[\s\W]/g, '-')

    article.body.innerHTML = marked(article.body.textContent)

    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const title = form.title.value
      const body = form.body.value.replace(/<\/?script(.)*?>/g, '')
      const slug = path == 'create' ? form.slug.value : ''

      try {
        const res = await fetch(`/articles/${path}`, {
          method,
          body: JSON.stringify(path == 'create' ? { title, body, slug } : { title, body }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (data.errors) {
          errors.title.textContent = data.errors.title
          errors.body.textContent = data.errors.body
          if (path == 'create') errors.slug.textContent = data.errors.slug
        }
        if (data.article) location.assign(`/articles/${slug !== '' ? slug : location.pathname.split('/')[2]}`)
      } catch (err) {
        console.log(err.message)
      }
    })

    form.title.addEventListener('keyup', () => {
      if (path != 'create') document.querySelector('span.title').textContent = form.title.value
      form.slug.value = slugify(form.title.value)
      article.title.textContent = form.title.value
    })
    form.body.addEventListener(
      'keyup',
      () => (article.body.innerHTML = marked(form.body.value.replace(/<\/?script(.)*?>/g, '')))
    )
  }

  const details = () => {
    const article = document.querySelector('article')
    article.innerHTML = marked(article.innerHTML)
  }
  const _delete = () => {
    const del = document.querySelector('a.delete')

    del.addEventListener('dblclick', () =>
      fetch(`/articles/${del.dataset.doc}/delete`, { method: 'DELETE' })
        .then((res) => res.json())
        .then((data) => location.assign(data.redirect))
        .catch(console.log)
    )
  }

  return {
    details,
    create: () => main('create', 'POST'),
    edit: () => main(location.pathname.substr(10), 'PUT'),
    _delete,
  }
}
const discuss = () => {
  const socket = io()
  const name = document.querySelector('.links ul li#name').textContent.substring(9)
  const chatbox = document.querySelector('#chatbox')
  const form = document.querySelector('#sendmsg')
  const sendmsg = (data, isself = false) =>
    (chatbox.innerHTML += isself
      ? `<li class="self"><span class="msg">${data}</span></li>`
      : `<li><span class="name">${data.name}</span><span class="msg">${data.msg}</span></li>`)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = form.msg.value.replace(/<\/?script(.)*>/g, '')
    if (msg == '' || /^\s+$/g.test(msg)) return
    socket.emit('new-msg', { name, msg })
    sendmsg(msg, true)
    form.msg.value = ''
  })
  socket.on('sendmsg', sendmsg)
}
