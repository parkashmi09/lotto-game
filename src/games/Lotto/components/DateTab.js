import styled from "styled-components"

const DateButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: ${(props) => (props.selected ? "#4CAF50" : "white")};
  color: ${(props) => (props.selected ? "white" : "#333")};
  cursor: pointer;
  font-weight: 500;
`

function DateTab({ selectedDate, setSelectedDate }) {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <div>
      <h2>Select Date</h2>
      {dates.map((date) => (
        <DateButton
          key={date.toISOString()}
          selected={date.toDateString() === selectedDate.toDateString()}
          onClick={() => setSelectedDate(date)}
        >
          {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </DateButton>
      ))}
    </div>
  )
}

export default DateTab

