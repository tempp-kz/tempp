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

  function kouzuPickupCreateCard(card, background) {
    const article = document.createElement("article")
    article.className = "kouzu-pickup-card kouzu-pickup-card--" + card.type
    article.style.backgroundImage =
      "url('" + kouzuPickupBasePath() + "/static/pickup-backgrounds/" + background + "')"

    const imageFrame = document.createElement("div")
    imageFrame.className = "kouzu-pickup-card__image"
    const image = document.createElement("img")
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

  function kouzuRenderPickupCards() {
    const host = document.getElementById("kouzu-pickup-cards")
    if (!host || host.dataset.rendered === "true") return

    const requestedCount = Number.parseInt(host.dataset.pickupCount || "2", 10)
    const count = Number.isFinite(requestedCount)
      ? Math.max(1, Math.min(requestedCount, kouzuPickupCards.length))
      : Math.min(2, kouzuPickupCards.length)
    const backgrounds = kouzuPickupShuffle(kouzuPickupBackgrounds)

    const grid = document.createElement("div")
    grid.className = "kouzu-pickup-grid"
    for (let index = 0; index < count; index += 1) {
      grid.appendChild(
        kouzuPickupCreateCard(
          kouzuPickupCards[index],
          backgrounds[index % backgrounds.length],
        ),
      )
    }

    host.replaceChildren(grid)
    host.dataset.rendered = "true"
    document.dispatchEvent(new CustomEvent("kouzu-pickup-ready"))
  }

  document.addEventListener("nav", kouzuRenderPickupCards)
  document.addEventListener("render", kouzuRenderPickupCards)
  kouzuRenderPickupCards()
  `

  Component.css = `
  #kouzu-pickup-cards {
    margin: 2rem 0 2.5rem;
  }

  .kouzu-pickup-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 28rem), 1fr));
    gap: 1.25rem;
  }

  .kouzu-pickup-card {
    position: relative;
    display: grid;
    grid-template-columns: minmax(8.5rem, 38%) minmax(0, 1fr);
    min-height: 21rem;
    margin: 0;
    padding: 2rem 1.8rem;
    overflow: hidden;
    border: 0;
    border-radius: 0.35rem;
    background-color: var(--light);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0.4rem 1.25rem color-mix(in srgb, var(--dark) 12%, transparent);
    isolation: isolate;
  }

  .kouzu-pickup-card__image {
    position: relative;
    z-index: 1;
    align-self: stretch;
    min-height: 15rem;
    margin: 1.1rem 0 1rem 0.4rem;
    overflow: hidden;
    border: 0.55rem solid color-mix(in srgb, var(--light) 88%, transparent);
    box-shadow: 0 0.25rem 0.8rem color-mix(in srgb, var(--dark) 18%, transparent);
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
    padding: 0.9rem 0.3rem 0.8rem 1.15rem;
    color: var(--dark);
  }

  .kouzu-pickup-card__kicker {
    align-self: flex-start;
    margin: 0 0 0.8rem;
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
    margin: 0 0 0.8rem;
    padding: 0 0 0.65rem;
    border-bottom: 1px solid color-mix(in srgb, var(--dark) 42%, transparent);
    font-size: clamp(1.25rem, 2.1vw, 1.8rem);
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
    font-size: 0.88rem;
    line-height: 1.65;
  }

  .kouzu-pickup-card__row {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    gap: 0.65rem;
    padding: 0.55rem 0;
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
  }

  .kouzu-pickup-card a {
    font-weight: 700;
  }

  @media (max-width: 720px) {
    #kouzu-pickup-cards {
      margin: 1.4rem 0 2rem;
    }

    .kouzu-pickup-card {
      grid-template-columns: 1fr;
      min-height: 0;
      padding: 1.5rem 1.25rem 1.65rem;
      background-size: cover;
    }

    .kouzu-pickup-card__image {
      width: min(76%, 18rem);
      min-height: 10.5rem;
      max-height: 13rem;
      margin: 0.7rem auto 0.4rem;
    }

    .kouzu-pickup-card__content {
      padding: 0.8rem 0.35rem 0.2rem;
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
