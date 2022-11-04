chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'start') {
    chrome.runtime.sendMessage({
      domain: document.domain,
      url: location.href,
    })
  }

  return true
})
