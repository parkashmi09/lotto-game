import { useState } from "react"
import styled from "styled-components"
import { User, Bell, Target, Calendar, DollarSign, CheckCircle } from "lucide-react"
import NumbersTab from "./components/NumbersTab"
import TypeTab from "./components/TypeTab"
import DateTab from "./components/DateTab"
import DrawingTab from "./components/DrawingTab"
import AmountTab from "./components/AmountTab"
import ConfirmTab from "./components/ConfirmTab"



const Container = styled.div`
  max-width: 60%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

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
  background: #5f7a76;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 0;

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`

const GameSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background: white;
  color: #333;
  font-size: 1rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.25rem;
    margin-right: 0.25rem;
    max-width: 100px;
  }
`

const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0.5rem;
  background: #e6f4f1;
  position: relative;
  gap: 0;
//   width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: 0.5rem 0.25rem;
    justify-content: flex-start;
  }
`

const StepConnector = styled.div`
  flex: 1;
  height: 2px;
  background: ${props => props.active ? '#4CAF50' : '#ddd'};
  position: relative;
  max-width: 40px;

  @media (max-width: 768px) {
    max-width: 16px;
  }
`

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 0 0.25rem;
  min-width: max-content;

  .icon-container {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${props => props.active ? '#4CAF50' : '#fff'};
    border: 2px solid ${props => props.active ? '#4CAF50' : '#ddd'};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.35rem;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      width: 28px;
      height: 28px;
      margin-bottom: 0.25rem;
    }

    svg {
      color: ${props => props.active ? '#fff' : '#666'};
      width: 18px;
      height: 18px;

      @media (max-width: 768px) {
        width: 14px;
        height: 14px;
      }
    }
  }

  span {
    font-size: 0.7rem;
    color: ${props => props.active ? '#4CAF50' : '#666'};
    text-transform: uppercase;
    font-weight: ${props => props.active ? '600' : '400'};
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 0.6rem;
    }
  }

  &:hover {
    .icon-container {
      border-color: #4CAF50;
      svg {
        color: ${props => props.active ? '#fff' : '#4CAF50'};
      }
    }
    span {
      color: #4CAF50;
    }
  }
`

const MainContent = styled.div`
  padding: 1.5rem;
  background: #ffffff;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }
`

const Footer = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: #4CAF50;
  color: white;
  position: sticky;
  bottom: 0;
`

const FooterButton = styled.button`
  padding: 0.75rem;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.8rem;
    gap: 0.25rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

function Lotto() {
  const [activeTab, setActiveTab] = useState("numbers")
  const [numbers, setNumbers] = useState([])
  const [gameType, setGameType] = useState("pick2")
  const [betType, setBetType] = useState("straight")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDrawing, setSelectedDrawing] = useState(null)
  const [amount, setAmount] = useState(1)

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
        return <DateTab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      case "drawing":
        return <DrawingTab selectedDrawing={selectedDrawing} setSelectedDrawing={setSelectedDrawing} />
      case "amount":
        return <AmountTab amount={amount} setAmount={setAmount} />
      case "confirm":
        return (
          <ConfirmTab 
            numbers={numbers} 
            gameType={gameType} 
            betType={betType}
            selectedDate={selectedDate} 
            selectedDrawing={selectedDrawing} 
            amount={amount} 
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
        <GameSelect value={gameType} onChange={handleGameTypeChange}>
          <option value="pick2">Pick 2</option>
          <option value="pick3">Pick 3</option>
          <option value="pick4">Pick 4</option>
          <option value="pick5">Pick 5</option>
        </GameSelect>
        <Balance>
          <DollarSign size={16} />
          <span>$ 0.00 USD</span>
        </Balance>
        <Bell size={24} />
      </Header>

      <TabsContainer>
        <Tab active={activeTab === "numbers"} onClick={() => setActiveTab("numbers")}>
          <div className="icon-container">
            <Target />
          </div>
          <span>NUMBERS</span>
        </Tab>
        <StepConnector active={activeTab !== "numbers"} />
        <Tab active={activeTab === "type"} onClick={() => setActiveTab("type")}>
          <div className="icon-container">
            <Target />
          </div>
          <span>TYPE</span>
        </Tab>
        <StepConnector active={activeTab !== "numbers" && activeTab !== "type"} />
        <Tab active={activeTab === "date"} onClick={() => setActiveTab("date")}>
          <div className="icon-container">
            <Calendar />
          </div>
          <span>DATE</span>
        </Tab>
        <StepConnector active={activeTab !== "numbers" && activeTab !== "type" && activeTab !== "date"} />
        <Tab active={activeTab === "drawing"} onClick={() => setActiveTab("drawing")}>
          <div className="icon-container">
            <Target />
          </div>
          <span>DRAWING</span>
        </Tab>
        <StepConnector active={activeTab !== "numbers" && activeTab !== "type" && activeTab !== "date" && activeTab !== "drawing"} />
        <Tab active={activeTab === "amount"} onClick={() => setActiveTab("amount")}>
          <div className="icon-container">
            <DollarSign />
          </div>
          <span>AMOUNT</span>
        </Tab>
        <StepConnector active={activeTab === "confirm"} />
        <Tab active={activeTab === "confirm"} onClick={() => setActiveTab("confirm")}>
          <div className="icon-container">
            <CheckCircle />
          </div>
          <span>CONFIRM</span>
        </Tab>
      </TabsContainer>

      <MainContent>
        {renderActiveTab()}
      </MainContent>

      <Footer>
        <FooterButton>
          BUY TICKETS
        </FooterButton>
        <FooterButton>
          MY TICKETS
        </FooterButton>
      </Footer>
    </Container>
  )
}

export default Lotto
