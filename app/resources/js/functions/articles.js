import marked from 'marked'

import { $, $_ } from '../utils'

const main = (path, method) => () => {
  const form = $('form.article')
  const article = {
    title: $('.preview .title'),
    body: $('.preview article'),
  }
  const errors = {
    title: $_(form, '.title-err.error'),
    body: $_(form, '.body-err.error'),
    slug: path == 'create' ? $_(form, '.slug-err.error') : '',
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
    if (path != 'create') $('span.title').textContent = form.title.value
    form.slug.value = slugify(form.title.value)
    article.title.textContent = form.title.value
  })
  form.body.addEventListener(
    'keyup',
    () => (article.body.innerHTML = marked(form.body.value.replace(/<\/?script(.)*?>/g, '')))
  )
}

export const create = main('create', 'POST')
export const edit = main(location.pathname.substr(10), 'PUT')

export const details = () => {
  if (!$('article')) return

  const article = $('article')
  article.innerHTML = marked(article.innerHTML)
}

export const _delete = () => {
  if (!$('a.delete')) return

  const del = $('a.delete')

  del.addEventListener('dblclick', () =>
    fetch(`/articles/${del.dataset.doc}/delete`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => location.assign(data.redirect))
      .catch(console.log)
  )
}
