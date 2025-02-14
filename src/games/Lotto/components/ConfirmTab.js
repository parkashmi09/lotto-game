import styled from "styled-components"

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1a1d24;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem;
  margin-bottom: 1rem;

  .info {
    text-align: right;
    color: #fff;
  }

  .label {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
    opacity: 0.7;
  }

  .value {
    font-size: 1.25rem;
    font-weight: 500;
  }
`

const TicketList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1rem;
  overflow-y: auto;
  margin-bottom: 1rem;

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

const TicketCard = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
`

const TicketHeader = styled.div`
  background: #6366f1;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const TicketBody = styled.div`
  padding: 1.5rem;
  color: #6b7280;

  .numbers {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1d24;
  }

  .info-grid {
    display: grid;
    gap: 1rem;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;

    .label {
      color: #6b7280;
    }

    .value {
      text-align: right;
      font-weight: 500;
      color: #1a1d24;
    }
  }
`

function ConfirmTab({ tickets = [], totalCost = 0, availableBalance = 0 }) {
  return (
    <Container>
      <Header>
        <div className="info">
          <div className="label">Total cost:</div>
          <div className="value">${totalCost.toFixed(2)}</div>
        </div>
        <div className="info">
          <div className="label">Available balance:</div>
          <div className="value">${availableBalance.toFixed(2)}</div>
        </div>
        <div className="info">
          <div className="label">Tickets:</div>
          <div className="value">{tickets.length}</div>
        </div>
      </Header>

      <TicketList>
        {tickets.map((ticket, index) => (
          <TicketCard key={index}>
            <TicketHeader>
              <span>Straight</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </TicketHeader>
            <TicketBody>
              <div className="numbers">
                {ticket.numbers.map((num, idx) => (
                  <span key={idx}>{num}</span>
                ))}
              </div>
              <div className="info-grid">
                <div className="info-row">
                  <span className="label">Cost per ticket:</span>
                  <span className="value">${ticket.costPerTicket.toFixed(2)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Total cost:</span>
                  <span className="value">${ticket.totalCost.toFixed(2)}</span>
                </div>
                <div className="info-row">
                  <span className="label">Drawing state:</span>
                  <span className="value">{ticket.drawingState}</span>
                </div>
                <div className="info-row">
                  <span className="label">Draw date:</span>
                  <span className="value">{ticket.drawDate}</span>
                </div>
                <div className="info-row">
                  <span className="label">Prize:</span>
                  <span className="value">${ticket.prize.toFixed(2)}</span>
                </div>
              </div>
            </TicketBody>
          </TicketCard>
        ))}
      </TicketList>
    </Container>
  )
}

export default ConfirmTab
