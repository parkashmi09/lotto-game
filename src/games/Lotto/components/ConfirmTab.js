import { useState } from "react"
import styled from "styled-components"
import { X } from "lucide-react"

const PurchaseButton = styled.button`
  background: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
  color: #1a1d24;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin: 1rem;
  width: calc(100% - 2rem);

  &:hover {
    background: #00cc6f;
  }

  &:disabled {
    background: #3a3f47;
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: #1E2128;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  padding: 1.5rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
  }

  h2 {
    color: #fff;
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
  }

  .summary {
    margin-bottom: 2rem;
    
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      &:last-child {
        border-bottom: none;
      }

      .label {
        color: rgba(255, 255, 255, 0.6);
      }

      .value {
        color: #fff;
        font-weight: 600;
      }
    }
  }

  .actions {
    display: grid;
    gap: 1rem;

    button {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &.confirm {
        background: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
        color: #1a1d24;

        &:hover {
          background: #00cc6f;
        }
      }

      &.cancel {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1E2128;
`

const WarningMessage = styled.div`
  background: rgba(255, 86, 48, 0.1);
  border: 1px solid rgba(255, 86, 48, 0.2);
  color: #FF5630;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem;
  font-size: 0.875rem;
  line-height: 1.5;

  ul {
    margin: 0.5rem 0 0 1rem;
    padding: 0;
    
    li {
      margin-bottom: 0.25rem;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem;
  margin: 1rem;

  .info {
    text-align: right;
    color: #fff;
  }

  .label {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .value {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
  }
`

const TicketList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
`

const TicketCard = styled.div`
  background: #282C34;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 1rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const TicketHeader = styled.div`
  background: #3c8c40;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  // &::after {
  //   content: 'WITH FIREBALL';
  //   position: absolute;
  //   right: 1rem;
  //   background: linear-gradient(90deg, #1e3b8d 0%, #2451c7 100%);
  //   padding: 0.25rem 0.75rem;
  //   border-radius: 4px;
  //   font-size: 0.875rem;
  // }

  svg {
    width: 1rem;
    height: 1rem;
  }
`

const TicketBody = styled.div`
  padding: 1.5rem;
  color: rgba(255, 255, 255, 0.6);

  .numbers {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
  }

  .info-grid {
    display: grid;
    gap: 0.75rem;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;

    .label {
      color: rgba(255, 255, 255, 0.6);
    }

    .value {
      text-align: right;
      font-weight: 600;
      color: #fff;
    }

    .value a {
      color: #4CAF50;
      text-decoration: none;
    }
  }
`

function ConfirmTab({ tickets = [], ticketCount = 0, totalCost = 0, availableBalance = 0, numbers = [], selectedDates = [], selectedDrawings = [] }) {
  const [showModal, setShowModal] = useState(false)
  const getMissingSteps = () => {
    const missingSteps = [];
    if (!numbers?.length) missingSteps.push('Select your numbers');
    if (!selectedDates?.length) missingSteps.push('Select draw date');
    if (!selectedDrawings?.length) missingSteps.push('Select drawing time');
    return missingSteps;
  }

  const missingSteps = getMissingSteps();

  return (
    <Container>
      <PurchaseButton 
        onClick={() => setShowModal(true)}
        disabled={getMissingSteps().length > 0}
      >
        Purchase Tickets
      </PurchaseButton>

      {showModal && (
        <Modal>
          <ModalContent>
            <button className="close-button" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>
            <h2>Confirm Purchase</h2>
            <div className="summary">
              <div className="row">
                <span className="label">Total Tickets</span>
                <span className="value">{ticketCount || 0}</span>
              </div>
              <div className="row">
                <span className="label">Total Cost</span>
                <span className="value">${totalCost.toFixed(2)}</span>
              </div>
            </div>
            <div className="actions">
              <button className="confirm" onClick={() => {
                // Handle purchase confirmation
                setShowModal(false)
              }}>
                Confirm Purchase
              </button>
              <button className="cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </ModalContent>
        </Modal>
      )}
      {missingSteps.length > 0 && (
        <WarningMessage>
          Please complete the following steps:
          <ul>
            {missingSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </WarningMessage>
      )}
      <Header>
        <div className="info">
          <div className="label">Total cost:</div>
          <div className="value">${totalCost.toFixed(2)}</div>
        </div>
        {/* <div className="info">
          <div className="label">Available balance:</div>
          <div className="value">${availableBalance.toFixed(2)}</div>
        </div> */}
        <div className="info">
          <div className="label">Tickets:</div>
          <div className="value">{ticketCount ||0}</div>
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
