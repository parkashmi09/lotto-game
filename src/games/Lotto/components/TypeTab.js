import styled from "styled-components"

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const TypeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: 2px solid ${(props) => (props.active ? "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))" : "#e2e8f0")};
  background: ${(props) => (props.active ? "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
  }

  .icon {
    position: absolute;
    left: 1rem;
    width: 24px;
    height: 24px;
  }

  .text {
    flex: 1;
    text-align: center;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .description {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.25rem;
  }
`

function TypeTab({ betType, setBetType }) {
  return (
    <Container>
      <TypeButton
        active={betType === "straight"}
        onClick={() => setBetType("straight")}
      >
        <div className="text">
          <div>Straight</div>
          <div className="description">Exact order</div>
        </div>
      </TypeButton>

      <TypeButton
        active={betType === "boxed"}
        onClick={() => setBetType("boxed")}
      >
        <div className="text">
          <div>Boxed</div>
          <div className="description">Any order</div>
        </div>
      </TypeButton>
    </Container>
  )
}

export default TypeTab
