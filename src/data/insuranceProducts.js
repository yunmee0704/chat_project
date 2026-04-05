/**
 * 추천 카드는 모두 삼성생명 브랜드만 사용합니다.
 * 질문·AI 답변에서 키워드로 매칭되는 순서대로 첫 번째 상품을 고릅니다.
 */
/** 카드 상단 회사명 — 삼성생명만 노출 */
const SAMSUNG_LIFE = '삼성생명보험'

export const INSURANCE_PRODUCTS = [
  {
    match: /실손|의료실비|실비/i,
    bannerKicker: 'PREMIUM SELECTION',
    bannerTitle: SAMSUNG_LIFE,
    productName: '실손의료비보험',
    description: '상해/질병 입원 및 통원 치료비 보장',
    premium: '월 12,500원',
    badge: 'VERIFIED',
  },
  {
    match: /암보험|암\s*진단|암\s*보장/i,
    bannerKicker: 'BEST VALUE',
    bannerTitle: SAMSUNG_LIFE,
    productName: '암보험',
    description: '암 진단 시 정액 보장, 재진단·전이 특약 선택 가능',
    premium: '월 24,000원',
    badge: 'VERIFIED',
  },
  {
    match: /자동차|운전자|대인배상|대물배상/i,
    bannerKicker: 'AUTO CARE',
    bannerTitle: SAMSUNG_LIFE,
    productName: '운전자·교통상해 보장보험',
    description: '교통사고 상해·후유장해 등 운전·탑승 중 사고 보장',
    premium: '월 58,000원',
    badge: 'VERIFIED',
  },
  {
    match: /화재|주택|가재|누수/i,
    bannerKicker: 'HOME SAFE',
    bannerTitle: SAMSUNG_LIFE,
    productName: '주택화재·가재 보장보험',
    description: '화재·도난·누수 등 주택·가재 피해 보장',
    premium: '월 9,200원',
    badge: 'VERIFIED',
  },
  {
    match: /종신/i,
    bannerKicker: 'LIFE PLAN',
    bannerTitle: SAMSUNG_LIFE,
    productName: '종신보험',
    description: '사망 시 유가족 생활비·상속 준비를 위한 정액 보장',
    premium: '월 180,000원',
    badge: 'VERIFIED',
  },
  {
    match: /연금|노후|은퇴/i,
    bannerKicker: 'RETIREMENT',
    bannerTitle: SAMSUNG_LIFE,
    productName: '연금보험',
    description: '확정·변액형 선택, 노후 현금 흐름 설계',
    premium: '월 300,000원',
    badge: 'VERIFIED',
  },
  {
    match: /상해|상해보험|골절/i,
    bannerKicker: 'ACCIDENT GUARD',
    bannerTitle: SAMSUNG_LIFE,
    productName: '상해보험',
    description: '일상·레저 중 상해 사고 의료비·후유장해 보장',
    premium: '월 15,800원',
    badge: 'VERIFIED',
  },
  {
    match: /여행|해외|출국/i,
    bannerKicker: 'TRAVEL',
    bannerTitle: SAMSUNG_LIFE,
    productName: '해외여행보험',
    description: '의료비·휴대품·항공 지연 등 여행 중 사고 보장',
    premiumLabel: '예상 보험료(1회)',
    premium: '12,000원',
    badge: 'VERIFIED',
  },
]

/** 키워드가 없을 때 (예: "보험만 추천해줘") */
export const DEFAULT_INSURANCE_PRODUCT = {
  bannerKicker: 'PREMIUM SELECTION',
  bannerTitle: SAMSUNG_LIFE,
  productName: '맞춤 보험 상담',
  description: '대화 내용을 바탕으로 삼성생명보험 담당자가 적합한 상품을 안내해 드립니다.',
  premiumLabel: '보험료 안내',
  premium: '상담 후 안내',
  badge: 'GUIDE',
}

/**
 * @param {string} userText
 * @param {string} assistantText
 * @returns {Omit<(typeof INSURANCE_PRODUCTS)[number], 'match'>}
 */
export function pickInsuranceProduct(userText, assistantText) {
  const combined = `${userText} ${assistantText}`

  for (const { match, ...product } of INSURANCE_PRODUCTS) {
    if (match.test(combined)) {
      return product
    }
  }

  return { ...DEFAULT_INSURANCE_PRODUCT }
}
