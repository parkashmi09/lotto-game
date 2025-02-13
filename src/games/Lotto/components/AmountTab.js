import styled from "styled-components"
import { Plus, Minus } from "lucide-react"

const AmountControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
`

const AmountButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #718096;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Amount = styled.div`
  padding: 0.5rem 2rem;
  background: #718096;
  color: white;
  border-radius: 0.5rem;
  font-weight: bold;
`

function AmountTab({ amount, setAmount }) {
  return (
    <div>
      <h2>Select Amount</h2>
      <AmountControls>
        <AmountButton onClick={() => setAmount(Math.max(1, amount - 1))}>
          <Minus size={20} />
        </AmountButton>
        <Amount>${amount}.00</Amount>
        <AmountButton onClick={() => setAmount(amount + 1)}>
          <Plus size={20} />
        </AmountButton>
      </AmountControls>
    </div>
  )
}

export default AmountTab

