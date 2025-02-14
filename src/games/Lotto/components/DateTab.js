import styled from "styled-components"
import { Calendar } from "lucide-react"

const Container = styled.div`
  padding: 1rem;
  color: #fff;
`

const DateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  padding-right: 0.5rem;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`

const DateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${props => props.selected ? 'linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.selected ? '#1a1d24' : '#fff'};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: ${props => props.selected ? 'linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))' : 'rgba(255, 255, 255, 0.1)'};
  }

  .icon {
    width: 40px;
    height: 40px;
    background: ${props => props.selected ? '#1a1d24' : 'rgba(255, 255, 255, 0.1)'};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
      width: 20px;
      height: 20px;
      color: #fff;
    }
  }

  .date-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .date {
    font-weight: 600;
  }

  .relative {
    font-size: 0.875rem;
    color: ${props => props.selected ? '#1a1d24' : 'linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))'};
    opacity: ${props => props.selected ? 0.8 : 1};
  }
`

function DateTab({ selectedDates = [], onDateSelect }) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const nextWeek = new Array(7).fill(null).map((_, index) => {
    const date = new Date(today)
    date.setDate(date.getDate() + index)
    return {
      date,
      relative: index === 0 ? "Today" : index === 1 ? "Tomorrow" : new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date)
    }
  })

  const isSelected = (date) => 
    selectedDates.some(selectedDate => 
      selectedDate.toDateString() === date.toDateString()
    )

  return (
    <Container>
      <DateList>
        {nextWeek.map(({ date, relative }) => (
          <DateButton
            key={date.toISOString()}
            selected={isSelected(date)}
            onClick={() => onDateSelect(date)}
          >
            <div className="icon">
              <Calendar />
            </div>
            <div className="date-info">
              <div className="date">
                {new Intl.DateTimeFormat('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                }).format(date)}
              </div>
              <div className="relative">{relative}</div>
            </div>
          </DateButton>
        ))}
      </DateList>
    </Container>
  )
}

export default DateTab
