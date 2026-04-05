import { useEffect, useRef } from 'react'
import { InsuranceRecCard } from './InsuranceRecCard'
import './MessageList.scss'

export function MessageList({ messages, loading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="message-list">
      {messages.length === 0 && !loading && (
        <p className="message-list__empty">메시지를 입력해 대화를 시작하세요.</p>
      )}
      <ul className="message-list__items">
        {messages.map((m) => (
          <li key={m.id} className={`message-list__row message-list__row--${m.role}`}>
            <div className="message-list__bubble">{m.content}</div>
            {m.role === 'assistant' && m.showInsuranceRec && m.insuranceRec ? (
              <InsuranceRecCard {...m.insuranceRec} />
            ) : null}
          </li>
        ))}
        {loading ? (
          <li className="message-list__row message-list__row--assistant">
            <div className="message-list__bubble message-list__bubble--typing">typing...</div>
          </li>
        ) : null}
        <li ref={bottomRef} aria-hidden="true" />
      </ul>
    </div>
  )
}
