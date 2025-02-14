import { useState, useMemo } from "react"
import styled from "styled-components"
import { User, Bell, Target, Calendar, DollarSign, CheckCircle, Hash, Clock } from "lucide-react"
import NumbersTab from "./components/NumbersTab"
import TypeTab from "./components/TypeTab"
import DateTab from "./components/DateTab"
import DrawingTab from "./components/DrawingTab"
import AmountTab from "./components/AmountTab"
import ConfirmTab from "./components/ConfirmTab"


const Container = styled.div`
  max-width: 60%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: #1a1d24;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  color: #fff;
  overflow: hidden;

  @media (max-width: 1200px) {
    max-width: 70%;
  }

  @media (max-width: 992px) {
    max-width: 80%;
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`

const Header = styled.header`
  background: #2a2e35;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 0;

  select {
    background: #1a1d24;
    color: #fff;
    border: 1px solid #3a3f47;
    padding: 0.5rem;
    border-radius: 0.5rem;
    outline: none;
    cursor: pointer;

    &:focus {
      border-color: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
    }
  }

  .amount {
    color: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1e2328;
  position: relative;
  border-bottom: 1px solid #2a2e35;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  opacity: ${({ active, completed }) => (active || completed ? 1 : 0.5)};
  
  &:not(:last-child) {
    flex: 1;
    
    &::after {
      content: "";
      position: absolute;
      left: calc(50% + 20px);
      top: 61%;
      width: calc(100% - 40px);
      height: 2px;
      background: ${({ active, completed }) =>
        completed ? "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))" : "#3a3f47"};
      transform: translateY(-20px);
      z-index: 1;

      @media (max-width: 768px) {
        left: calc(50% + 12px);
        width: calc(100% - 24px);
        transform: translateY(-16px);
      }
    }
  }

  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ active, completed }) =>
      completed ? "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))" : active ? "#3a3f47" : "transparent"};
    border: 2px solid ${({ active, completed }) =>
      completed ? "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))" : "#3a3f47"};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    position: relative;
    z-index: 2;
    transition: all 0.2s ease;

    svg {
      width: 20px;
      height: 20px;
      color: ${({ active, completed }) =>
        completed ? "#1a1d24" : "#fff"};
    }

    @media (max-width: 768px) {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;

      svg {
        width: 12px;
        height: 12px;
      }
    }
  }

  .label {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({ active, completed }) =>
      active || completed ? "#fff" : "#666"};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 0.6rem;
      letter-spacing: 0;
    }
  }

  &:hover {
    opacity: 1;
    
    .circle {
      transform: scale(1.05);
      border-color: ${({ completed }) =>
        completed ? "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))" : "#00cc6f"};
      background: ${({ active, completed }) =>
        completed ? "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))" : active ? "#00cc6f" : "transparent"};
    }
  }

  @media (max-width: 768px) {
    padding: 0 2px;
  }
`

const MainContent = styled.div`
  padding: 1.5rem;
  background: #1a1d24;
  flex: 1;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;
  min-height: 0; /* This is important for flex child scrolling */

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`

const Footer = styled.footer`
  margin-top: auto;
  padding: 1rem;
  background: #2a2e35;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  .nav-buttons {
    grid-column: 1 / -1;
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;

    &.primary {
      background: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
      color: #1a1d24;

      &:hover {
        background: #00cc6f;
      }

      &:disabled {
        background: #3a3f47;
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    &.secondary {
      background: #3a3f47;
      color: #fff;

      &:hover:not(:disabled) {
        background: #4a4f57;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
`

function Lotto() {
  const [activeTab, setActiveTab] = useState("numbers")
  const [numbers, setNumbers] = useState([])
  const [gameType, setGameType] = useState("pick2")
  const [betType, setBetType] = useState("straight")
  const [selectedDates, setSelectedDates] = useState([new Date()])
  const [selectedDrawings, setSelectedDrawings] = useState([])
  const [amount, setAmount] = useState(1)

  const drawings = [
    { id: 1, name: "PR Evening", time: "4:00 PM", prize: 90.00 },
    { id: 2, name: "PA Evening", time: "6:25 PM", prize: 90.00 },
  ]

  const handleNumberSubmit = (newNumber) => {
    if (!numbers.includes(newNumber)) {
      setNumbers([...numbers, newNumber])
    }
  }

  const handleNumberRemove = (numberToRemove) => {
    setNumbers(numbers.filter(num => num !== numberToRemove))
  }

  const handleRemoveAll = () => {
    setNumbers([])
  }

  const handleGameTypeChange = (e) => {
    setGameType(e.target.value)
    setNumbers([]) // Clear numbers when game type changes
  }

  const handleDateSelect = (date) => {
    setSelectedDates(prevDates => {
      const dateExists = prevDates.some(d => 
        d.toDateString() === date.toDateString()
      )
      if (dateExists) {
        return prevDates.filter(d => 
          d.toDateString() !== date.toDateString()
        )
      }
      return [...prevDates, date]
    })
  }

  const handleDrawingSelect = (drawing) => {
    setSelectedDrawings(prevDrawings => {
      const exists = prevDrawings.find(d => d.id === drawing.id)
      if (exists) {
        return prevDrawings.filter(d => d.id !== drawing.id)
      }
      return [...prevDrawings, drawing]
    })
  }

  const handlePrevStep = () => {
    const currentIndex = ["numbers", "type", "date", "drawing", "amount", "confirm"].indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(["numbers", "type", "date", "drawing", "amount", "confirm"][currentIndex - 1])
    }
  }

  const handleNextStep = () => {
    const currentIndex = ["numbers", "type", "date", "drawing", "amount", "confirm"].indexOf(activeTab)
    if (currentIndex < ["numbers", "type", "date", "drawing", "amount", "confirm"].length - 1) {
      setActiveTab(["numbers", "type", "date", "drawing", "amount", "confirm"][currentIndex + 1])
    }
  }

  const generateTickets = () => {
    if (!numbers.length || !selectedDrawings.length || !selectedDates.length) return []

    const ticketCount = selectedDates.length * selectedDrawings.length * amount
    const totalCostPerTicket = 1.00
    const ticketCards = []

    selectedDates.forEach(date => {
      selectedDrawings.forEach(drawing => {
        ticketCards.push({
          numbers,
          betType,
          costPerTicket: totalCostPerTicket,
          totalCost: totalCostPerTicket * amount,
          drawingState: `${drawing.name} ${drawing.time}`,
          drawDate: date.toDateString() === new Date().toDateString() ? "Today" : "Tomorrow",
          prize: drawing.prize,
          withFireball: drawing.withFireball
        })
      })
    })

    return {
      tickets: ticketCards,
      totalCost: ticketCount * totalCostPerTicket,
      ticketCount
    }
  }

  const ticketData = useMemo(() => generateTickets(), [
    numbers,
    selectedDrawings,
    selectedDates,
    betType,
    amount
  ])

  const renderActiveTab = () => {
    switch (activeTab) {
      case "numbers":
        return (
          <NumbersTab
            numbers={numbers}
            onSubmit={handleNumberSubmit}
            onRemove={handleNumberRemove}
            onRemoveAll={handleRemoveAll}
            gameType={gameType}
          />
        )
      case "type":
        return <TypeTab betType={betType} setBetType={setBetType} />
      case "date":
        return (
          <DateTab 
            selectedDates={selectedDates} 
            onDateSelect={handleDateSelect}
          />
        )
      case "drawing":
        return (
          <DrawingTab 
            selectedDrawings={selectedDrawings} 
            onDrawingSelect={handleDrawingSelect}
            drawings={drawings}
          />
        )
      case "amount":
        return <AmountTab amount={amount} setAmount={setAmount} />
      case "confirm":
        return (
          <ConfirmTab 
            tickets={ticketData.tickets}
            ticketCount={ticketData.tickets?.length*numbers.length}
            totalCost={ticketData.totalCost}
            availableBalance={0}
            amount={amount}
            numbers={numbers}
            selectedDates={selectedDates}
            selectedDrawings={selectedDrawings}
          />
        )
      default:
        return null
    }
  }

  return (
    <Container>
      <Header>
        <User size={24} />
        <select value={gameType} onChange={handleGameTypeChange}>
          <option value="pick2">Pick 2</option>
          <option value="pick3">Pick 3</option>
          <option value="pick4">Pick 4</option>
          <option value="pick5">Pick 5</option>
        </select>
        <div className="amount">
          {/* <DollarSign size={16} /> */}
          <span>$ 0.00 USD</span>
        </div>
        <Bell size={24} />
      </Header>

      <StepperContainer>
        <Step 
          active={activeTab === "numbers"} 
          completed={activeTab !== "numbers"}
          onClick={() => setActiveTab("numbers")}
        >
          <div className="circle">
            <Target />
          </div>
          <div className="label">NUMBERS</div>
        </Step>
        <Step 
          active={activeTab === "type"} 
          completed={["date", "drawing", "amount", "confirm"].includes(activeTab)}
          onClick={() => setActiveTab("type")}
        >
          <div className="circle">
            <Hash />
          </div>
          <div className="label">TYPE</div>
        </Step>
        <Step 
          active={activeTab === "date"} 
          completed={["drawing", "amount", "confirm"].includes(activeTab)}
          onClick={() => setActiveTab("date")}
        >
          <div className="circle">
            <Calendar />
          </div>
          <div className="label">DATE</div>
        </Step>
        <Step 
          active={activeTab === "drawing"} 
          completed={["amount", "confirm"].includes(activeTab)}
          onClick={() => setActiveTab("drawing")}
        >
          <div className="circle">
            <Clock />
          </div>
          <div className="label">DRAWING</div>
        </Step>
        <Step 
          active={activeTab === "amount"} 
          completed={["confirm"].includes(activeTab)}
          onClick={() => setActiveTab("amount")}
        >
          <div className="circle">
            <DollarSign />
          </div>
          <div className="label">AMOUNT</div>
        </Step>
        <Step 
          active={activeTab === "confirm"} 
          completed={false}
          onClick={() => setActiveTab("confirm")}
        >
          <div className="circle">
            <CheckCircle />
          </div>
          <div className="label">CONFIRM</div>
        </Step>
      </StepperContainer>

      <MainContent>
        {renderActiveTab()}
      </MainContent>

      <Footer>
        <div className="nav-buttons">
        <div style={{display: "flex", gap: "1rem", width: "100%", justifyContent: "space-between"}}>
        <button 
            className="secondary" 
            onClick={handlePrevStep}
            disabled={activeTab === "numbers"}
          >
            Previous Step
          </button>
          <button 
            className="primary" 
            onClick={handleNextStep}
            disabled={activeTab === "confirm"}
          >
            Next Step
          </button>
        </div>
        </div>
        <button className="primary">
          BUY TICKETS
        </button>
        <button className="secondary">
          MY TICKETS
        </button>
      </Footer>
    </Container>
  )
}

export default Lotto
