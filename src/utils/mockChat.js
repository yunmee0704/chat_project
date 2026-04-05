/** 포트폴리오 배포용: API 키 없이 고정 지연 후 텍스트만 반환 */

const REPLY_DELAY_MS = 900

/** App.jsx 의 shouldShowInsuranceCard 와 사용자 쪽 조건을 맞춤 */
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

/**
 * @param {string} userText
 * @returns {Promise<string>}
 */
export function getMockAssistantReply(userText) {
  const trimmed = userText.trim()

  return new Promise((resolve) => {
    setTimeout(() => {
      if (!trimmed) {
        resolve('메시지를 입력해 주세요.')
        return
      }

      if (isInsuranceContext(trimmed)) {
        resolve(
          '삼성생명보험 컨시어지입니다. 문의하신 내용을 반영해 안내드립니다. 아래 추천 상품의 보장 요약과 예상 보험료를 참고해 주세요.',
        )
        return
      }

      resolve(
        '안녕하세요. 실손보험, 암보험, 자동차보험 등 키워드로 질문하시면 추천 카드와 함께 답변이 표시됩니다.',
      )
    }, REPLY_DELAY_MS)
  })
}
