/**
 * 动态加载 JS 脚本
 */
export function importScript(src, { isAsync = false } = {}) {
  return new Promise((resolve, reject) => {
    const x1 = Date.now();
    if (document.body.querySelector(`script[src="${src}"]`)) {
      return resolve(src)
    }

    const script = document.createElement('script')
    script.src = src
    script.async = isAsync
    script.onload = () => resolve(src)
    script.onerror = () => reject(src)
    document.body.appendChild(script)
  });
}

/**
 * 动态加载 CSS 脚本
 */
export function importStyle(href) {
  return new Promise((resolve, reject) => {
    if (document.body.querySelector(`link[href="${href}"]`)) {
      return resolve(href)
    }

    const sheet = document.createElement('link')
    sheet.rel = 'stylesheet'
    sheet.href = href
    sheet.onload = () => resolve(href)
    sheet.onerror = () => reject(href)
    document.body.appendChild(sheet)
  });
}