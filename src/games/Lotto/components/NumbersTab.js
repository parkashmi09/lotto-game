import { useState } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

const Container = styled.div`
  padding: 0.75rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 0.75rem;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
    max-width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #3a3f47;
  border-radius: 2rem;
  font-size: 1rem;
  outline: none;
  padding-right: 100px;
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
  background: #2a2e35;
  color: #fff;

  &::placeholder {
    color: #666;
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.75rem;
    font-size: 0.9rem;
    padding-right: 80px;
    border-radius: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    padding-right: 70px;
    border-radius: 1.25rem;
  }

  &:focus {
    border-color: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
    box-shadow: 0 0 0 1px linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
  }
`;

const RemoveAllButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.85rem;
  white-space: nowrap;
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    right: 0.5rem;
    padding: 0.4rem;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem;
    font-size: 0.7rem;
  }

  &:hover {
    color: linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113));
  }

  &:active {
    transform: translateY(-50%) scale(0.98);
  }
`;

const NumbersList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const NumberItem = styled.div`
  position: relative;
  background: #2a2e35;
  padding: 0.75rem;
  border-radius: 0.5rem;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;
  border: 1px solid #3a3f47;
  color: #fff;

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 1rem;
  }

  .remove-btn {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #1a1d24;
    border: 1px solid #3a3f47;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #666;
    padding: 0;

    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }

    &:hover {
      color: #ef4444;
      border-color: #ef4444;
    }

    svg {
      width: 14px;
      height: 14px;

      @media (max-width: 768px) {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

const TicketsCount = styled.div`
  margin-bottom: 0.75rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    gap: 0.25rem;
  }
`;

const Example = styled.div`
  color: #999;
  font-size: 0.85rem;
  margin-left: 0.75rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }
`;
const NubmerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

function NumbersTab({ numbers, onSubmit, onRemove, onRemoveAll, gameType }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredLength =
      gameType === "pick2"
        ? 2
        : gameType === "pick3"
        ? 3
        : gameType === "pick4"
        ? 4
        : 5;

    if (inputValue.length === requiredLength && !numbers.includes(inputValue)) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setInputValue(value);
  };

  const getPlaceholder = () => {
    switch (gameType) {
      case "pick2":
        return "Enter 2 digits";
      case "pick3":
        return "Enter 3 digits";
      case "pick4":
        return "Enter 4 digits";
      case "pick5":
        return "Enter 5 digits";
      default:
        return "Enter your numbers";
    }
  };

  const getExample = () => {
    switch (gameType) {
      case "pick2":
        return "e.g. 12";
      case "pick3":
        return "e.g. 123";
      case "pick4":
        return "e.g. 1234";
      case "pick5":
        return "e.g. 12345";
      default:
        return "e.g. 12";
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={
              gameType === "pick2"
                ? 2
                : gameType === "pick3"
                ? 3
                : gameType === "pick4"
                ? 4
                : 5
            }
            placeholder={getPlaceholder()}
          />
          {numbers.length > 0 && (
            <RemoveAllButton type="button" onClick={onRemoveAll}>
              Remove all
            </RemoveAllButton>
          )}
        </InputContainer>
        <NubmerContainer>
          <TicketsCount>
            {numbers.length} tickets
            <Example>{getExample()}</Example>
          </TicketsCount>
        </NubmerContainer>
      </form>
      <NubmerContainer>
        <NumbersList>
          {numbers.map((number, index) => (
            <NumberItem key={index}>
              {number}
              <button className="remove-btn" onClick={() => onRemove(number)}>
                <X />
              </button>
            </NumberItem>
          ))}
        </NumbersList>
      </NubmerContainer>
    </Container>
  );
}

export default NumbersTab;
