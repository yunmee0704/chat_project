import './InsuranceRecCard.scss'

const defaultProps = {
  bannerKicker: 'PREMIUM SELECTION',
  badge: 'VERIFIED',
  ctaLabel: '상세보기',
  premiumLabel: '예상 월 납입보험료',
}

export function InsuranceRecCard({
  bannerKicker = defaultProps.bannerKicker,
  bannerTitle,
  productName,
  description,
  premium,
  premiumLabel = defaultProps.premiumLabel,
  badge = defaultProps.badge,
  ctaLabel = defaultProps.ctaLabel,
}) {
  const ariaLabel = `추천 상품: ${productName}, ${bannerTitle}`

  return (
    <article className="ins-rec-card" aria-label={ariaLabel}>
      <div className="ins-rec-card__banner" aria-hidden="true">
        <span className="ins-rec-card__banner-kicker">{bannerKicker}</span>
        <span className="ins-rec-card__banner-title">{bannerTitle}</span>
      </div>

      <div className="ins-rec-card__body">
        <div className="ins-rec-card__title-row">
          <h3 className="ins-rec-card__product-name">{productName}</h3>
          <span className="ins-rec-card__badge">{badge}</span>
        </div>
        <p className="ins-rec-card__desc">{description}</p>

        <div className="ins-rec-card__price-box">
          <span className="ins-rec-card__price-label">{premiumLabel}</span>
          <span className="ins-rec-card__price-value">{premium}</span>
        </div>

        <button type="button" className="ins-rec-card__cta">
          {ctaLabel}
        </button>
      </div>
    </article>
  )
}
