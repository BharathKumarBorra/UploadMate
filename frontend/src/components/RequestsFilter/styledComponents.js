import styled from "styled-components";

export const FiltersContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 6px;
  border-bottom: solid 1px #cbd5e1;
`;
export const FilterItem = styled.li`
  list-style-type: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${(props) => props.selected && "white"};
  background-color: ${(props) => (props.selected ? "black" : "#f2f2f2")};
  padding: 5px 14px;
  border-radius: 8px;

  cursor: pointer;
  &:hover {
    background-color: ${(props) => !props.selected && "#e5e5e5"};
  }
`;
