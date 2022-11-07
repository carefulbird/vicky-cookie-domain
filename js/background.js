// background.js

function setCookies(url, domain, excludes) {
  chrome.cookies.getAll({ url }, function (cookies) {
    console.log(cookies, url)
    if (Array.isArray(cookies)) {
      cookies
        .filter((_) => excludes.indexOf(_.name) == -1)
        .forEach(function (cookie) {
          const name = cookie.name
          const value = cookie.value
          const path = cookie.path
          chrome.cookies.set({
            path,
            url,
            name,
            value,
            domain,
          })
        })
    }
  })
}

/**
 * 监听 click 事件传过来的消息
 */
chrome.runtime.onMessage.addListener((obj) => {
  const { url, domain, excludes, type } = obj
  if (type === 'background') {
    setCookies(url, domain, excludes)
  }
})
