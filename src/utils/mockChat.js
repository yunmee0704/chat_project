/** API 없이 고정 지연 후 답변 (문장만 랜덤으로 골라 티 덜 나게) */

const REPLY_DELAY_MS = 900

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function isInsuranceContext(text) {
  const t = text.trim()
  if (/보험|실손|암보험|건강보험|상해보험|종신|연금보험|자동차보험|화재보험/i.test(t)) {
    return true
  }
  if (/추천/.test(t) && /보험|상품|가입|플랜|보장/.test(t)) {
    return true
  }
  return false
}

const INSURANCE_REPLIES = [
  '그거면 삼성생명에서 흔히 찾는 유형이에요. 아래 카드는 대략적인 보장이랑 월 납입 감만 잡아본 거라, 진짜 가입 전엔 한번 더 확인하는 게 좋아요.',
  '질문하신 내용이랑 비슷하게 많이들 물어보시는 편이에요. 카드에 나온 금액은 예시라서 나이나 특약에 따라 꽤 달라질 수 있어요.',
  '응, 그런 케이스면 보통 이런 상품부터 같이 보더라고요. 아래 요약만 보고 괜찮으면 설계 쪽으로 넘기면 돼요.',
]

const CASUAL_REPLIES = [
  '실손보험, 암보험, 자동차보험처럼 딱 집어서 물어봐 주시면 아래에 맞는 카드도 같이 뜰 거예요.',
  '처음이면 그냥 "실손 추천" 정도만 쳐도 돼요. 키워드만 있으면 카드가 붙어요.',
  '보험 이름만 던져도 괜찮아요. 뭐가 궁금한지 한 줄만 적어 주세요.',
]

/**
 * @param {string} userText
 * @returns {Promise<string>}
 */
export function getMockAssistantReply(userText) {
  const trimmed = userText.trim()

  return new Promise((resolve) => {
    setTimeout(() => {
      if (!trimmed) {
        resolve('내용을 한 줄만 적어 주세요.')
        return
      }

      if (isInsuranceContext(trimmed)) {
        resolve(pick(INSURANCE_REPLIES))
        return
      }

      resolve(pick(CASUAL_REPLIES))
    }, REPLY_DELAY_MS)
  })
}
