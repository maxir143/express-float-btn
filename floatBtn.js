const HIDABLE_CLASS = 'ln-container-hidable'

function floatContainer (btnOptions) {
  // Container element
  const container = document.createElement('div')
  container.id = 'ln-main-container'

  // Control button element
  floatBtn(container,
    {
      ...btnOptions,
      hidable: false,
      hidden: false,
      openIcon: 'gg-close',
      onClick: toggleButtons
    })

  // Logic
  function toggleButtons (state) {
    const element = Array.from(document.getElementsByClassName(HIDABLE_CLASS))
    if (state) {
      element.forEach((e) => e.setAttribute('hidden', true))
    } else {
      element.forEach((e) => e.removeAttribute('hidden'))
    }
  }

  return container
}

function floatBtn (parent, options) {
  const {
    variant = 'primary', // [primary]
    title = 'float btn',
    hidable = true,
    hidden = true,
    icon = 'gg-math-plus',
    openIcon,
    closeIcon,
    onClick = function () { },
    onOpen = function () { },
    onClose = function () { }
  } = { ...options }

  // Button container element
  const container = document.createElement('div')
  container.className = `${hidable ? HIDABLE_CLASS : ''}`
  if (hidden) {
    container.setAttribute('hidden', true)
  }
  parent.appendChild(container)

  // Button element
  const button = document.createElement('button')
  button.className = `float-btn ln-btn-${variant}`
  button.title = title

  container.appendChild(button)

  // Icon element
  const iconElement = document.createElement('i')
  iconElement.className = icon
  button.appendChild(iconElement)

  // State
  let {
    open = true
  } = { ...options }

  function handleClick () {
    open = !open
    onClick(open)
    if (open) {
      iconElement.className = closeIcon ?? icon
      onOpen()
    } else {
      iconElement.className = openIcon ?? icon
      onClose()
    }
  }
  button.addEventListener('click', handleClick)

  return button
}

// Create content
const mainContainer = floatContainer()

floatBtn(mainContainer, { icon: 'gg-browser' })
floatBtn(mainContainer, { icon: 'gg-link' })

document.body.appendChild(mainContainer)
