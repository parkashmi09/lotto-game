import styled from "styled-components"
import { Clock } from "lucide-react"

const Container = styled.div`
  padding: 1rem;
  color: #fff;
`

const TimeZone = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.875rem;

  svg {
    width: 16px;
    height: 16px;
  }
`

const DrawingList = styled.div`
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

const DrawingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${props => props.selected ? '#00ff88' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.selected ? '#1a1d24' : '#fff'};
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  position: relative;

  &:hover {
    background: ${props => props.selected ? '#00ff88' : 'rgba(255, 255, 255, 0.1)'};
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
      color: ${props => props.selected ? '#00ff88' : '#fff'};
    }
  }

  .drawing-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    font-weight: 600;
  }

  .countdown {
    font-size: 0.875rem;
    color: ${props => props.selected ? '#1a1d24' : '#00ff88'};
    opacity: ${props => props.selected ? 0.8 : 1};
  }
`;

function DrawingTab({ selectedDrawings, onDrawingSelect, drawings }) {
  return (
    <Container>
      <TimeZone>
        <Clock size={16} />
        USA Eastern Time
      </TimeZone>
      <DrawingList>
        {drawings.map((drawing) => (
          <DrawingButton
            key={drawing.id}
            selected={selectedDrawings.some(d => d.id === drawing.id)}
            onClick={() => onDrawingSelect(drawing)}
          >
            <div className="icon">
              <Clock />
            </div>
            <div className="drawing-info">
              <div>
                <div className="name">{drawing.name} {drawing.time}</div>
                {drawing.withFireball && (
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    WITH FIREBALL
                  </div>
                )}
              </div>
              <div className="countdown">{drawing.countdown}</div>
            </div>
          </DrawingButton>
        ))}
      </DrawingList>
    </Container>
  )
}

export default DrawingTab
