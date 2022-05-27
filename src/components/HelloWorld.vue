<script setup>
import { ref } from 'vue'
import { demoApi } from '@/api/modules/demo.js'
import { getAvailableLanguages, switchLanguage } from '@/i18n'

defineProps({
  msg: String
})

const langs = getAvailableLanguages()
function changeLanguage(locale) {
  switchLanguage(locale)
  window.location.reload()
}

const apiMsg = ref('loading...')
setTimeout(async () => {
  const data = await demoApi()
  apiMsg.value = data.msg
}, 2000)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    {{$t('hello.recommended-ide')}}:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://webpack.js.org/guides/" target="_blank">
      {{$t('hello.webpack-doc')}}
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">{{$t('hello.vue3-doc')}}</a>
  </p>

  <p>
    {{$t('hello.window-size')}}: {{$store.state.app.windowInnerWidth}} x {{$store.state.app.windowInnerHeight}}
  </p>

  <p>
    <router-view />
  </p>

  <p>
    I18n: <button v-for="(lang, $key) in langs" :key="lang" @click="changeLanguage($key)">{{lang}}</button>
  </p>

  <p>
    SvgIcons: <svg-icon icon-class="home" /> <svg-icon icon-class="team" /> <svg-icon icon-class="like" />
  </p>

  <p>
    {{apiMsg}}
  </p>
  
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
