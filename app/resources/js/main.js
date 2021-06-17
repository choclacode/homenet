import { makeRoutes, cbs } from './utils'
import * as articles from './functions/articles'
import * as auth from './functions/auth'
import { discuss } from './functions/discuss'

export default makeRoutes([
  [/^\/auth\/signup$/g, auth.signup],
  [/^\/auth\/login$/g, auth.login],
  [/^\/articles\/create$/g, articles.create],
  [/^\/articles\/.+$/g, cbs(articles.details, articles._delete)],
  [/^\/articles\/.+\/edit$/g, articles.edit],
  [/^\/discuss$/g, discuss],
])
