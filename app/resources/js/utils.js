export const $_ = (el, selector) => el?.querySelector(selector)
export const $$_ = (el, selector) => el?.querySelectorAll(selector)

export const $ = (selector) => $_(document, selector)
export const $$ = (selector) => $$_(document, selector)

// prettier-ignore
export const cbs = (...cbs) => () => {
  for (const cb of cbs) cb()
}

export const makeRoutes = (routes) => () =>
  routes.forEach(([route, callback]) => {
    if (location.pathname.match(route)) callback()
  })
