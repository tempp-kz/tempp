import type { QuartzComponent, QuartzComponentConstructor } from "./types"
import { pickupBackgrounds, pickupCards } from "./PickupCardsData"

const cardData = JSON.stringify(pickupCards.filter((card) => card.enabled))
const backgroundData = JSON.stringify(pickupBackgrounds)

const PickupCards: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = () => null

  Component.afterDOMLoaded = `
  const kouzuPickupCards = ${cardData}
  const kouzuPickupBackgrounds = ${backgroundData}

  function kouzuPickupBasePath() {
    return String(document.body.dataset.basepath || "").replace(/\\/$/, "")
  }

  function kouzuPickupHref(target) {
    const cleanTarget = String(target || "").replace(/^\\/+|\\/+$/g, "")
    const encodedTarget = cleanTarget
      .split("/")
      .filter(Boolean)
      .map((part) => encodeURIComponent(part))
      .join("/")
    return kouzuPickupBasePath() + "/" + encodedTarget
  }

  function kouzuPickupCreateLink(label, linkType, target, className) {
    if (linkType === "none" || !target) {
      const text = document.createElement("span")
      text.className = className || ""
      text.textContent = label
      return text
    }

    const link = document.createElement("a")
    link.className = "internal " + (className || "")
    link.textContent = label

    if (linkType === "work") {
      link.href = kouzuPickupHref("反映小説一覧")
      link.dataset.pickupWork = target
    } else {
      link.href = kouzuPickupHref(target)
      link.dataset.slug = String(target).replace(/^\\/+|\\/+$/g, "")
    }

    return link
  }

  function kouzuPickupShuffle(values) {
    const shuffled = [...values]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
    }
    return shuffled
  }

  function kouzuPickupSelectionKey(cards) {
    return cards
      .map((card) => card.name)
      .sort()
      .join("\u001f")
  }

  function kouzuPickupOrderKey(cards) {
    return cards.map((card) => card.name).join("\u001f")
  }

  function kouzuPickupSelectCards(count, previousSelection) {
    let selected = kouzuPickupShuffle(kouzuPickupCards).slice(0, count)
    if (kouzuPickupCards.length <= count || !previousSelection) return selected

    for (let attempt = 0; attempt < 8; attempt += 1) {
      if (kouzuPickupSelectionKey(selected) !== previousSelection) return selected
      selected = kouzuPickupShuffle(kouzuPickupCards).slice(0, count)
    }

    return selected
  }

  function kouzuPickupCreateCard(card, background) {
    const article = document.createElement("article")
    article.className = "kouzu-pickup-card kouzu-pickup-card--" + card.type
    article.dataset.pickupBackground = background
    article.style.backgroundImage =
      "url('" + kouzuPickupBasePath() + "/static/pickup-backgrounds/" + background + "')"

    const imageFrame = document.createElement("div")
    imageFrame.className = "kouzu-pickup-card__image"
    const image = document.createElement("img")
    image.dataset.pickupImage = card.image
    image.src = kouzuPickupHref(card.image)
    image.alt = card.imageAlt || card.name
    image.loading = "lazy"
    image.decoding = "async"
    image.style.objectPosition = card.imagePosition || "50% 50%"
    imageFrame.appendChild(image)

    const content = document.createElement("div")
    content.className = "kouzu-pickup-card__content"

    const kicker = document.createElement("p")
    kicker.className = "kouzu-pickup-card__kicker"
    kicker.append("PICK UP：")
    kicker.appendChild(
      kouzuPickupCreateLink(
        card.pickupLabel,
        card.pickupTarget ? "internal" : "none",
        card.pickupTarget,
        "kouzu-pickup-card__category",
      ),
    )

    const title = document.createElement("h3")
    title.className = "kouzu-pickup-card__title"
    const titleLabel = document.createElement("span")
    titleLabel.className = "kouzu-pickup-card__field-label"
    titleLabel.textContent = "名前："
    title.appendChild(titleLabel)
    title.appendChild(
      kouzuPickupCreateLink(card.name, card.nameLinkType, card.nameTarget, "kouzu-pickup-card__name"),
    )

    const details = document.createElement("dl")
    details.className = "kouzu-pickup-card__details"

    const regionRow = document.createElement("div")
    regionRow.className = "kouzu-pickup-card__row"
    const regionTerm = document.createElement("dt")
    regionTerm.textContent = "時代・地域："
    const regionDescription = document.createElement("dd")
    regionDescription.append(card.era + " ")
    regionDescription.appendChild(
      kouzuPickupCreateLink(card.region, "internal", card.regionTarget, ""),
    )
    regionDescription.append("。")
    regionRow.append(regionTerm, regionDescription)

    const descriptionRow = document.createElement("div")
    descriptionRow.className = "kouzu-pickup-card__row"
    const descriptionTerm = document.createElement("dt")
    descriptionTerm.textContent = "紹介："
    const descriptionText = document.createElement("dd")
    descriptionText.textContent = card.description
    descriptionRow.append(descriptionTerm, descriptionText)

    const relatedRow = document.createElement("div")
    relatedRow.className = "kouzu-pickup-card__row kouzu-pickup-card__row--related"
    const relatedTerm = document.createElement("dt")
    relatedTerm.textContent = card.relatedLabel + "："
    const relatedDescription = document.createElement("dd")
    card.related.forEach((item, index) => {
      if (index > 0) relatedDescription.append("、")
      relatedDescription.appendChild(
        kouzuPickupCreateLink(item.label, item.linkType, item.target, ""),
      )
    })
    if (card.relatedSuffix) relatedDescription.append(" " + card.relatedSuffix)
    relatedRow.append(relatedTerm, relatedDescription)

    details.append(regionRow, descriptionRow, relatedRow)
    content.append(kicker, title, details)
    article.append(imageFrame, content)
    return article
  }

  function kouzuRefreshPickupAssets(host) {
    for (const image of host.querySelectorAll("img[data-pickup-image]")) {
      image.src = kouzuPickupHref(image.dataset.pickupImage || "")
    }

    for (const card of host.querySelectorAll("[data-pickup-background]")) {
      const background = card.dataset.pickupBackground || ""
      card.style.backgroundImage =
        "url('" + kouzuPickupBasePath() + "/static/pickup-backgrounds/" + background + "')"
    }
  }

  function kouzuRenderPickupCards(forceRefresh = false) {
    const host = document.getElementById("kouzu-pickup-cards")
    if (!host) return

    if (
      !forceRefresh &&
      host.dataset.rendered === "true" &&
      host.querySelector(".kouzu-pickup-card")
    ) {
      kouzuRefreshPickupAssets(host)
      document.dispatchEvent(new CustomEvent("kouzu-pickup-ready"))
      return
    }

    const requestedCount = Number.parseInt(host.dataset.pickupCount || "2", 10)
    const responsiveCount = window.matchMedia("(max-width: 720px)").matches
      ? 1
      : requestedCount
    const count = Number.isFinite(responsiveCount)
      ? Math.max(1, Math.min(responsiveCount, kouzuPickupCards.length))
      : Math.min(2, kouzuPickupCards.length)
    const previousSelection = host.dataset.pickupSelection || ""
    const previousOrder = host.dataset.pickupOrder || ""
    const selectedCards = kouzuPickupSelectCards(count, previousSelection)
    if (
      forceRefresh &&
      count > 1 &&
      kouzuPickupOrderKey(selectedCards) === previousOrder
    ) {
      selectedCards.reverse()
    }
    const backgrounds = kouzuPickupShuffle(kouzuPickupBackgrounds)

    const controls = document.createElement("div")
    controls.className = "kouzu-pickup-controls"
    const refreshButton = document.createElement("button")
    refreshButton.type = "button"
    refreshButton.className = "kouzu-pickup-refresh"
    refreshButton.textContent = "↻ 表示を更新"
    refreshButton.setAttribute("aria-label", "PICK UPをランダムに更新")
    refreshButton.addEventListener("click", () => kouzuRenderPickupCards(true))
    controls.appendChild(refreshButton)

    const grid = document.createElement("div")
    grid.className = "kouzu-pickup-grid"
    for (let index = 0; index < count; index += 1) {
      grid.appendChild(
        kouzuPickupCreateCard(
          selectedCards[index],
          backgrounds[index % backgrounds.length],
        ),
      )
    }

    host.replaceChildren(controls, grid)
    host.dataset.pickupSelection = kouzuPickupSelectionKey(selectedCards)
    host.dataset.pickupOrder = kouzuPickupOrderKey(selectedCards)
    host.dataset.rendered = "true"
    document.dispatchEvent(new CustomEvent("kouzu-pickup-ready"))
  }

  document.addEventListener("nav", () => kouzuRenderPickupCards())
  document.addEventListener("render", () => kouzuRenderPickupCards())
  kouzuRenderPickupCards()
  `

  Component.css = `
  #kouzu-pickup-cards {
    width: 100%;
    margin: 0.65rem 0 2.5rem;
  }

  .kouzu-pickup-controls {
    display: flex;
    justify-content: flex-end;
    margin: 0 0.2rem 0.65rem;
  }

  .kouzu-pickup-refresh {
    appearance: none;
    padding: 0.38rem 0.85rem;
    border: 1px solid color-mix(in srgb, var(--secondary) 55%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--light) 88%, transparent);
    color: var(--darkgray);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
  }

  .kouzu-pickup-refresh:hover {
    border-color: var(--secondary);
    background: color-mix(in srgb, var(--secondary) 10%, var(--light));
  }

  .kouzu-pickup-refresh:focus-visible {
    outline: 2px solid var(--secondary);
    outline-offset: 2px;
  }

  .kouzu-pickup-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 28rem), 1fr));
    gap: 1.25rem;
  }

  .kouzu-pickup-card {
    position: relative;
    display: grid;
    grid-template-columns: minmax(6.8rem, 30%) minmax(0, 1fr);
    min-height: 17.5rem;
    margin: 0;
    padding: 1.35rem 3.35rem 1.6rem 2.1rem;
    overflow: hidden;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: none;
    box-sizing: border-box;
    isolation: isolate;
  }

  .kouzu-pickup-card__image {
    position: relative;
    z-index: 1;
    align-self: center;
    height: 11.75rem;
    min-height: 0;
    margin: 0.6rem 0 0.55rem 0.35rem;
    overflow: hidden;
    border: 0.4rem solid color-mix(in srgb, var(--light) 88%, transparent);
    box-shadow: 0 0.25rem 0.8rem color-mix(in srgb, var(--dark) 18%, transparent);
    box-sizing: border-box;
    transform: rotate(-0.7deg);
  }

  .kouzu-pickup-card__image img {
    width: 100%;
    height: 100%;
    margin: 0;
    object-fit: cover;
  }

  .kouzu-pickup-card__content {
    position: relative;
    z-index: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
    padding: 0.45rem 1.15rem 0.6rem 0.9rem;
    color: var(--dark);
    overflow-wrap: anywhere;
  }

  .kouzu-pickup-card__kicker {
    align-self: flex-start;
    margin: 0 0 0.45rem;
    padding: 0.3rem 0.75rem;
    border-bottom: 1px solid color-mix(in srgb, var(--dark) 65%, transparent);
    background: color-mix(in srgb, var(--light) 70%, transparent);
    font-family: var(--headerFont);
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .kouzu-pickup-card__title {
    display: flex;
    align-items: baseline;
    gap: 0.55rem;
    min-width: 0;
    margin: 0 0 0.45rem;
    padding: 0 0 0.45rem;
    border-bottom: 1px solid color-mix(in srgb, var(--dark) 42%, transparent);
    font-size: clamp(1.15rem, 1.85vw, 1.55rem);
    line-height: 1.25;
  }

  .kouzu-pickup-card__field-label {
    flex: 0 0 auto;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .kouzu-pickup-card__name {
    min-width: 0;
  }

  .kouzu-pickup-card__details {
    display: grid;
    gap: 0;
    margin: 0;
    font-size: 0.84rem;
    line-height: 1.48;
  }

  .kouzu-pickup-card__row {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    gap: 0.55rem;
    padding: 0.28rem 0;
    border-bottom: 1px dotted color-mix(in srgb, var(--dark) 28%, transparent);
  }

  .kouzu-pickup-card__row:last-child {
    border-bottom: 0;
  }

  .kouzu-pickup-card__row dt {
    font-weight: 700;
  }

  .kouzu-pickup-card__row dd {
    min-width: 0;
    margin: 0;
    overflow-wrap: anywhere;
  }

  .kouzu-pickup-card a {
    max-width: 100%;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  @media (max-width: 720px) {
    #kouzu-pickup-cards {
      width: 100%;
      margin: 0.5rem 0 2rem;
    }

    .kouzu-pickup-controls {
      margin: 0 0.1rem 0.55rem;
    }

    .kouzu-pickup-card {
      grid-template-columns: 1fr;
      min-height: 0;
      padding: 1.2rem 1.8rem 1.55rem 1.65rem;
      background-size: 100% 100%;
    }

    .kouzu-pickup-card__image {
      display: none;
    }

    .kouzu-pickup-card__content {
      padding: 0.55rem 0.95rem 0.3rem 0.85rem;
    }

    .kouzu-pickup-card__row {
      grid-template-columns: 1fr;
      gap: 0.05rem;
    }
  }
  `

  return Component
}

export default PickupCards
