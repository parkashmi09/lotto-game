import styled from "styled-components"

const DrawingButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: ${(props) => (props.selected ? "#4CAF50" : "white")};
  color: ${(props) => (props.selected ? "white" : "#333")};
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: left;
  font-weight: 500;
`

function DrawingTab({ selectedDrawing, setSelectedDrawing }) {
  const drawings = [
    { id: 1, name: "Morning Draw", time: "10:00 AM" },
    { id: 2, name: "Midday Draw", time: "2:00 PM" },
    { id: 3, name: "Evening Draw", time: "7:00 PM" },
    { id: 4, name: "Night Draw", time: "10:00 PM" },
  ]

  return (
    <div>
      <h2>Select Drawing</h2>
      {drawings.map((drawing) => (
        <DrawingButton
          key={drawing.id}
          selected={selectedDrawing && selectedDrawing.id === drawing.id}
          onClick={() => setSelectedDrawing(drawing)}
        >
          {drawing.name} - {drawing.time}
        </DrawingButton>
      ))}
    </div>
  )
}

export default DrawingTab

