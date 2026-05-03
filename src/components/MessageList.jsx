import { useEffect, useRef } from 'react'
import { InsuranceRecCard } from './InsuranceRecCard'
import './MessageList.scss'

export function MessageList({ messages }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <p className="message-list__empty">편하게 한 줄만 남겨도 돼요.</p>
      )}
      <ul className="message-list__items">
        {messages.map((message) => (
          <li key={message.id} className={`message-list__row message-list__row--${message.role}`}>
            <div className="message-list__bubble">{message.content}</div>
            {message.role === 'assistant' && message.showInsuranceRec && message.insuranceRec ? (
              <InsuranceRecCard
                bannerKicker={message.insuranceRec.bannerKicker}
                bannerTitle={message.insuranceRec.bannerTitle}
                productName={message.insuranceRec.productName}
                description={message.insuranceRec.description}
                premium={message.insuranceRec.premium}
                premiumLabel={message.insuranceRec.premiumLabel}
                badge={message.insuranceRec.badge}
              />
            ) : null}
          </li>
        ))}
        <li ref={bottomRef} aria-hidden="true" />
      </ul>
    </div>
  )
}
