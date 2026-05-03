import { useState } from 'react'
import { MessageList } from './components/MessageList'
import { InputBox } from './components/InputBox'
import { pickInsuranceProduct } from './data/insuranceProducts'
import { getMockAssistantReply } from './utils/mockChat'
import './App.scss'

function shouldShowInsuranceCard(userText) {
  var text = userText.trim()
  var insuranceKeywords = ['보험', '실손', '암보험', '건강보험', '상해보험', '종신', '연금보험', '자동차보험', '화재보험']
  var recommendKeywords = ['보험', '상품', '가입', '플랜', '보장']
  var i = 0

  for (i = 0; i < insuranceKeywords.length; i += 1) {
    if (text.includes(insuranceKeywords[i])) {
      return true
    }
  }

  if (text.includes('추천')) {
    for (i = 0; i < recommendKeywords.length; i += 1) {
      if (text.includes(recommendKeywords[i])) {
        return true
      }
    }
  }

  return false
}

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  function handleSend() {
    const text = input.trim()
    if (!text) return

    const userMessage = { id: crypto.randomUUID(), role: 'user', content: text }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    const aiText = getMockAssistantReply(text)
    const showInsuranceRec = shouldShowInsuranceCard(text)
    const insuranceRec = showInsuranceRec ? pickInsuranceProduct(text, aiText) : null

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
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">보험 상담</h1>
        <p className="app__subtitle">짧게 써도 돼요. 실손·암·자동차 같은 말만 있어도 됩니다.</p>
      </header>
      <main className="app__main">
        <MessageList messages={messages} />
      </main>
      <footer className="app__footer">
        <InputBox
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={false}
        />
      </footer>
    </div>
  )
}

export default App
