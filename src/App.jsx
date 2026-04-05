import { useState } from 'react'
import { MessageList } from './components/MessageList'
import { InputBox } from './components/InputBox'
import { pickInsuranceProduct } from './data/insuranceProducts'
import { getMockAssistantReply } from './utils/mockChat'
import './App.scss'

/**
 * 목데이터 안내 문구에 보험 키워드가 들어가므로, 카드 표시는 사용자 입력만 본다.
 * (OpenAI 연동 `chat` 프로젝트는 AI 답변도 함께 본다.)
 */
function shouldShowInsuranceCard(userText) {
  const u = userText.trim()

  if (/보험|실손|암보험|건강보험|상해보험|종신|연금보험|자동차보험|화재보험/i.test(u)) {
    return true
  }
  if (/추천/.test(u) && /보험|상품|가입|플랜|보장/.test(u)) {
    return true
  }
  return false
}

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    const userMessage = { id: crypto.randomUUID(), role: 'user', content: text }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const aiText = await getMockAssistantReply(text)
      const showInsuranceRec = shouldShowInsuranceCard(text)
      const insuranceRec = showInsuranceRec
        ? pickInsuranceProduct(text, aiText)
        : null
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: aiText,
          showInsuranceRec,
          insuranceRec,
        },
      ])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `오류가 발생했습니다: ${e.message}`,
          showInsuranceRec: false,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-row">
          <h1 className="app__title">보험 챗봇</h1>
          <span className="app__demo-badge">목데이터 데모</span>
        </div>
        <p className="app__subtitle">API 키 없이 배포 가능한 포트폴리오용 버전입니다.</p>
      </header>
      <main className="app__main">
        <MessageList messages={messages} loading={loading} />
      </main>
      <footer className="app__footer">
        <InputBox
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={loading}
        />
      </footer>
    </div>
  )
}

export default App
