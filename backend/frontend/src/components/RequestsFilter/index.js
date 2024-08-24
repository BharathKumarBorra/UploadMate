import { filtersListContent } from "./languageContent";
import { FiltersContainer, FilterItem } from "./styledComponents";
const filtersList = filtersListContent.EN;

const RequestsFilter = (props) => {
  const { selectedFilter, getRequests } = props;

  const onChangeFilter = (newStatus) => {
    getRequests(newStatus);
  };

  return (
    <FiltersContainer>
      {filtersList.map((eachItem) => (
        <FilterItem
          key={eachItem.value}
          selected={eachItem.value === selectedFilter}
          onClick={() => {
            onChangeFilter(eachItem.value);
          }}
        >
          {eachItem.type}
        </FilterItem>
      ))}
    </FiltersContainer>
  );
};

export default RequestsFilter;
