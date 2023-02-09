const HIDABLE_CLASS = 'ln-container-hidable'
const MODAL_CLASS = 'ln-modal-window'

function floatContainer (btnOptions) {
  // Container element
  const container = document.createElement('div')
  container.id = 'ln-main-container'

  // Control button element
  floatBtn(container, {
    ...btnOptions,
    hidable: false,
    hidden: false,
    openIcon: 'gg-close',
    onClick: toggleButtons,
    onClose: closeAllModalWindows
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
    modal,
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

  // Modal element
  if (modal) {
    container.appendChild(modal)
  }

  function handleModalShow () {
    closeAllModalWindows()
    modal.removeAttribute('hidden')
  }

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
    if (modal) {
      handleModalShow()
    }
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

function floatModal (id) {
  const modal = document.createElement('div')
  modal.id = id
  modal.className = MODAL_CLASS

  return modal
}

function closeAllModalWindows () {
  Array.from(document.getElementsByClassName(MODAL_CLASS))
    .forEach((modal) => modal.setAttribute('hidden', true))
}

// CODE
const mainContainer = floatContainer()
const chatModal = floatModal('chat-modal')

chatModal.innerHTML = `
<iframe width="560" height="315" src="https://www.youtube.com/embed/iIyrLRixMs8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
`

floatBtn(mainContainer, { icon: 'gg-browser', modal: chatModal })
floatBtn(mainContainer, { icon: 'gg-link' })
document.body.appendChild(mainContainer)
