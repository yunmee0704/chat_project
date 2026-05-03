import './InputBox.scss'

export function InputBox({ value, onChange, onSend, disabled }) {
  var canSend = !disabled && value.trim() !== ''

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (canSend) {
        onSend()
      }
    }
  }

  return (
    <div className="input-box">
      <input
        type="text"
        className="input-box__field"
        placeholder="예: 실손이랑 암만 알고 싶어요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label="메시지 입력"
      />
      <button
        type="button"
        className="input-box__send"
        onClick={() => {
          if (canSend) {
            onSend()
          }
        }}
        disabled={!canSend}
      >
        보내기
      </button>
    </div>
  )
}
