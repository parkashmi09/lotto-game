import styled from "styled-components"
import { Plus, Minus } from "lucide-react"

const Container = styled.div`
  padding: 1rem;
  color: #fff;
`

const QuickAmounts = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  padding: 0.5rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
`

const QuickAmountButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))' : 'transparent'};
  color: ${props => props.active ? '#1a1d24' : '#fff'};
  border: none;
  border-radius: 100px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))' : 'rgba(255, 255, 255, 0.1)'};
  }
`

const AmountControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;
`

const AmountButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

const AmountInput = styled.input`
  width: 120px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(36, 238, 137, 0.5);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

function AmountTab({ amount, setAmount }) {
  const quickAmounts = [0.25, 0.50, 1, 5];

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };

  return (
    <Container>
      <QuickAmounts>
        {quickAmounts.map((value) => (
          <QuickAmountButton
            key={value}
            active={amount === value}
            onClick={() => setAmount(value)}
          >
            +{value}
          </QuickAmountButton>
        ))}
      </QuickAmounts>

      <AmountControls>
        <AmountButton onClick={() => setAmount(Math.max(0, amount - 1))}>
          <Minus />
        </AmountButton>
        <AmountInput
          type="number"
          value={amount}
          onChange={handleAmountChange}
          step="0.25"
          min="0"
        />
        <AmountButton onClick={() => setAmount(amount + 1)}>
          <Plus />
        </AmountButton>
      </AmountControls>
    </Container>
  )
}

export default AmountTab

