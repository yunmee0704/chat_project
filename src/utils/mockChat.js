/** API 없이 즉시 답변(랜덤 문장 선택) */

// 배열에서 무작위로 하나를 뽑아 반환하는 함수
function pick(arr) {
  // 0 이상 arr.length 미만의 정수 인덱스를 만들어 해당 원소를 반환
  return arr[Math.floor(Math.random() * arr.length)]
}

// 사용자가 입력한 문장이 보험 관련 맥락인지 판단하는 함수
function isInsuranceContext(text) {
  var t = text.trim().toLowerCase()
  var insuranceKeywords = ['보험', '실손', '암보험', '건강보험', '상해보험', '종신', '연금보험', '자동차보험', '화재보험']
  var recommendKeywords = ['보험', '상품', '가입', '플랜', '보장']
  var i = 0

  for (i = 0; i < insuranceKeywords.length; i += 1) {
    if (t.includes(insuranceKeywords[i])) {
      return true
    }
  }

  if (t.includes('추천')) {
    for (i = 0; i < recommendKeywords.length; i += 1) {
      if (t.includes(recommendKeywords[i])) {
        return true
      }
    }
  }

  return false
}

// 보험 맥락으로 판단됐을 때 보여줄 답변 후보들
const INSURANCE_REPLIES = [
  // 후보 1
  '그거면 삼성생명에서 흔히 찾는 유형이에요. 아래 카드는 대략적인 보장이랑 월 납입 감만 잡아본 거라, 진짜 가입 전엔 한번 더 확인하는 게 좋아요.',
  // 후보 2
  '질문하신 내용이랑 비슷하게 많이들 물어보시는 편이에요. 카드에 나온 금액은 예시라서 나이나 특약에 따라 꽤 달라질 수 있어요.',
  // 후보 3
  '응, 그런 케이스면 보통 이런 상품부터 같이 보더라고요. 아래 요약만 보고 괜찮으면 설계 쪽으로 넘기면 돼요.',
]

// 보험 맥락이 아닐 때 보여줄 일반 안내 답변 후보들
const CASUAL_REPLIES = [
  // 후보 1
  '실손보험, 암보험, 자동차보험처럼 딱 집어서 물어봐 주시면 아래에 맞는 카드도 같이 뜰 거예요.',
  // 후보 2
  '처음이면 그냥 "실손 추천" 정도만 쳐도 돼요. 키워드만 있으면 카드가 붙어요.',
  // 후보 3
  '보험 이름만 던져도 괜찮아요. 뭐가 궁금한지 한 줄만 적어 주세요.',
]

/**
 * 사용자의 입력을 받아 모의(가짜) 상담사 답변을 즉시 반환
 * @param {string} userText
 * @returns {string}
 */
export function getMockAssistantReply(userText) {
  var trimmed = userText.trim()

  if (!trimmed) {
    return '내용을 한 줄만 적어 주세요.'
  }

  if (isInsuranceContext(trimmed)) {
    return pick(INSURANCE_REPLIES)
  }

  return pick(CASUAL_REPLIES)
}
