class CookieDomain {
  constructor() {
    this.url = ''
    this.$preDomainSpan = this.$('preDomain')
    this.$preDomainSpan.innerHTML = ''
    this.$targetInput = this.$('targetInput')
    this.$excludeInput = this.$('excludeInput')
    this.$btn = this.$('confirmBtn')
  }

  $(id) {
    return document.getElementById(id)
  }

  btnEventListener() {
    this.$btn.addEventListener('click', () => {
      const domain = this.$targetInput.value
      const url = this.url
      const excludes = this.$excludeInput.value.split(',').map((_) => _.trim())

      chrome.runtime.sendMessage({
        domain,
        url,
        excludes,
        type: 'background',
      })
    })
  }

  init() {
    this.btnEventListener()
  }
}

function chromeEventListener(cookie) {
  // 监听
  chrome.runtime.onMessage.addListener(function (request) {
    const { domain, url } = request
    cookie.url = url
    cookie.$preDomainSpan.innerHTML = domain
    cookie.$targetInput.value = getDefaultTargetDomain(domain)
  })
  // 发送消息
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'start' })
  })
}

// 获取 targetDomain 默认值
function getDefaultTargetDomain(domain) {
  const arr = domain.split('.')
  const n = arr.length
  return '.' + arr.slice(n - 2).join('.')
}

window.addEventListener('DOMContentLoaded', () => {
  const cookie = new CookieDomain()
  cookie.init()
  chromeEventListener(cookie)
})
