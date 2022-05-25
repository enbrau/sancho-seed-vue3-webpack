import { createI18n } from 'vue-i18n/index'
import store from '@/store'

const langs = {
  locale: store.state.app.locale,
  messages: {}
}

const moduleFiles = require.context('./modules/', true, /\.js$/)
moduleFiles.keys().forEach((key) => {
  const arr = key.replace(/(\.\/|\.js)/g, '').split('/')
  const lang         = arr[0]
  const langPackName = arr[1]
  if (!langs.messages[lang]) {
    langs.messages[lang] = {}
    
  }
  langs.messages[lang][langPackName] = moduleFiles(key).default

  console.log(`[Sancho] Language pack loaded: ${lang} - ${langPackName}`)
})

export function getAvailableLanguages() {
  const langDict = {}
  for (const lang in langs.messages) {
    langDict[lang] = langs.messages[lang].lang ? langs.messages[lang].lang.name : lang
  }
  return langDict
}

const i18n = createI18n(langs)

export function switchLanguage(locale) {
  i18n.locale = locale
  store.dispatch('app/setLocale', locale)
}

export default i18n
