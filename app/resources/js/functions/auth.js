import { $, $_ } from '../utils'

const main = (path) => () => {
  const form = $(`form#${path}`)
  const errors = {
    username: $_(form, '.username.error'),
    nickname: path == 'signup' ? $_(form, '.nickname.error') : '',
    password: $_(form, '.password.error'),
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
        location.assign('/')
      }
    } catch (err) {
      console.log(err.message)
    }
  })
}

export const signup = main('signup')
export const login = main('login')
