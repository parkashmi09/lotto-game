import styled from "styled-components"

const ConfirmationDetails = styled.div`
  background: #e6f4f1;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`

const ConfirmButton = styled.button`
  background: #4CAF50;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;

  &:hover {
    background: #45a049;
  }
`

function ConfirmTab({ numbers, gameType, selectedDate, selectedDrawing, amount }) {
  const handleConfirm = () => {
    // Here you would typically send the data to your backend or perform the ticket purchase
    console.log("Confirming purchase:", { numbers, gameType, selectedDate, selectedDrawing, amount })
    alert("Purchase confirmed!")
  }

  return (
    <div>
      <h2>Confirm Your Purchase</h2>
      <ConfirmationDetails>
        <p>
          <strong>Game:</strong> {gameType === "pick2" ? "Pick 2" : "Pick 3"}
        </p>
        <p>
          <strong>Numbers:</strong> {numbers.join(", ")}
        </p>
        <p>
          <strong>Date:</strong> {selectedDate.toLocaleDateString()}
        </p>
        <p>
          <strong>Drawing:</strong>{" "}
          {selectedDrawing ? `${selectedDrawing.name} - ${selectedDrawing.time}` : "Not selected"}
        </p>
        <p>
          <strong>Amount:</strong> ${amount}.00
        </p>
      </ConfirmationDetails>
      <ConfirmButton onClick={handleConfirm}>Confirm Purchase</ConfirmButton>
    </div>
  )
}

export default ConfirmTab

